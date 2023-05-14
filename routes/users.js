const router = require('express').Router()
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users')
const {
  validationId,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validations')

router.get('/', getUsers)
router.get('/me', getCurrentUser)
router.get('/:userId', validationId('userId'), getUser)
router.patch('/me', validationUpdateUser, updateProfile)
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar)

module.exports = router
