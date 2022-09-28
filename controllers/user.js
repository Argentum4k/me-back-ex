const userModel = require('../models/user');

function getUsers(req, res) {
  userModel.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function getUser(req, res) {
  userModel.find({ _id: req.params.userId })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, about })
    .then((newUser) => res.send(newUser))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};
