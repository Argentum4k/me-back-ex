const cardModel = require('../models/card');

function getCards(req, res) {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
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

function putLike(req, res) {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((newCard) => res.send(newCard))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function deleteLike(req, res) {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((newCard) => res.send(newCard))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
