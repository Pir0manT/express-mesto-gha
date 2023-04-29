const Cards = require('../models/card')
const { handleError } = require('../utils/errors')

const getCards = (req, res) =>
  Cards.find({})
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res))

const createCard = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id
  return Cards.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => handleError(err, res))
}

const deleteCard = (req, res) => {
  const { cardId } = req.params
  return Cards.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res))
}

const toggleLike = (req, res, isLiked = true) => {
  const { cardId } = req.params
  return Cards.findByIdAndUpdate(
    cardId,
    isLiked
      ? { $addToSet: { likes: req.user._id } }
      : { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res))
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  toggleLike,
}
