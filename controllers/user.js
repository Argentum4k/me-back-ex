const userModel = require('../models/user');
const { INCORRECT_DATA, NOT_FOUND, DEFAULT_ERROR } = require('./errors');

function getUsers(req, res) {
  userModel.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.name} ${err.message}` }));
}

function getUser(req, res) {
  userModel.find({ _id: req.params.userId })
    .then((user) => {
      if (user.length) res.send(user);
      else res.status(NOT_FOUND).send({ message: 'Произошла ошибка: пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError')res.status(NOT_FOUND).send({ message: 'Произошла ошибка: пользователь не найден' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.name} ${err.message}` });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: переданы неверные данные' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.name} ${err.message}` });
    });
}

function updateProfile(req, res) {
  const { name = null, about = null } = req.body; // для валидации обнуляем
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: переданы неверные данные' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.name} ${err.message}` });
    });
}

function updateAvatar(req, res) {
  const { avatar = null } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(INCORRECT_DATA).send({ message: 'Произошла ошибка: переданы неверные данные' });
      else res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка: ${err.name} ${err.message}` });
    });
}

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};
