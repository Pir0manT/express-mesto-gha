const Users = require('../models/user')
const { handleError } = require('../utils/errors')

const getUsers = (req, res) =>
  Users.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err, res))

const getUser = (req, res) => {
  const { userId } = req.params
  return Users.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user)
    })
    .catch((err) => handleError(err, res))
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body
  return Users.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
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
    .then((user) => res.send(user))
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
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res))
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
}
