const Cards = require('../models/card')
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/errors')

const handleError = (err, res) => {
  switch (err.name) {
    case 'CastError':
    case 'ValidationError':
      res.status(BAD_REQUEST).send({ message: 'Invalid data sent' })
      break
    case 'DocumentNotFoundError':
      res
        .status(NOT_FOUND)
        .send({ message: 'Card with specified id not found' })
      break
    default:
      res.status(SERVER_ERROR).send({ message: 'Internal Server Error' })
      break
  }
}

const getCards = (req, res) =>
  Cards.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => handleError(err, res))

const createCard = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id
  return Cards.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => handleError(err, res))
}

const deleteCard = (req, res) => {
  const { cardId } = req.params
  return Cards.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
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
    .then((card) => res.status(200).send(card))
    .catch((err) => handleError(err, res))
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  toggleLike,
}
