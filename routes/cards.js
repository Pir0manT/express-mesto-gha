const router = require('express').Router()
const {
  getCards,
  createCard,
  deleteCard,
  toggleLike,
} = require('../controllers/cards')
const {
  validationCreateCard,
  validationId,
} = require('../middlewares/validations')

router.get('/', getCards)
router.post('/', validationCreateCard, createCard)
router.delete('/:cardId', validationId(), deleteCard)
router.put('/:cardId/likes', validationId(), toggleLike)
router.delete('/:cardId/likes', validationId(), (req, res, next) =>
  toggleLike(req, res, next, false)
)

module.exports = router
