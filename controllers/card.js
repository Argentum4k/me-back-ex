const cardModel = require('../models/card');

function getCards(req, res) {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function deleteCard(req, res) {
  cardModel.deleteOne({ _id: req.params.cardId }, (err) => {
    if (err) {
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    } else {
      res.status(400).send({ message: 'delete successful' });
    }
  });
}

module.exports = { getCards, createCard, deleteCard };
