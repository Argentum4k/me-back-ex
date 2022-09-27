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
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

module.exports = { getUsers, getUser, createUser };
