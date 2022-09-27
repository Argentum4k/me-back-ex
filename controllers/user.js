const user = require('../models/card')

function getUsers(req, res) {

}

function getUser(req, res) {

}

function createUser(req, res) {
  const {name, about, avatar} = req.body
  user.create({name, about, avatar})
  .then(newUser => res.send({ data: newUser }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
}

module.exports = {getUsers, getUser, createUser}