const Users = require('../models/user')
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
        .send({ message: 'User with specified id not found' })
      break
    default:
      res.status(SERVER_ERROR).send({ message: 'Internal Server Error' })
      break
  }
}

const getUsers = (req, res) =>
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(err, res))

const getUser = (req, res) => {
  const { userId } = req.params
  return Users.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => handleError(err, res))
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body
  return Users.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res))
}

const updateProfile = (req, res) => {
  const { name, about } = req.body
  return Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res))
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body
  return Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res))
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
}
