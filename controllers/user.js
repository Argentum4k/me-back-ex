require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { INCORRECT_DATA, NOT_FOUND, DEFAULT_ERROR } = require('./errors');

function getUsers(req, res) {
  userModel.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.message}` }));
}

function getUser(req, res) {
  userModel.findOne({ _id: req.params.userId })
    .then((user) => {
      if (user) res.send(user);
      else res.status(NOT_FOUND).send({ message: 'Произошла ошибка: пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError')res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: неверный ID пользователя' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
    });
}

function getMe(req, res) {
  userModel.findOne({ _id: req.user._id })
    .then((user) => {
      if (user) res.send(user);
      else res.status(NOT_FOUND).send({ message: 'Произошла ошибка: пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError')res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: неверный ID пользователя' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
    });
}

function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: переданы неверные данные' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
    });
}

function updateProfile(req, res) {
  const { name = null, about = null } = req.body; // для валидации обнуляем
  // eslint-disable-next-line max-len
  // все и так валидировалось в отправленном ранее варианте, см. app.js строка 11 а так же коментарий в предыдущей строке (!)
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: переданы неверные данные' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
    });
}

function updateAvatar(req, res) {
  const { avatar = null } = req.body; // для валидации обнуляем
  // eslint-disable-next-line max-len
  // все и так валидировалось в отправленном ранее варианте, см. app.js строка 11 а так же коментарий в предыдущей строке (!)
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: переданы неверные данные' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
    });
}

function login(req, res) {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      // вернём токен
      res.cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end();
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
}

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar, login, getMe,
};
