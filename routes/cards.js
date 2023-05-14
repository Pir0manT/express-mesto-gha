const router = require('express').Router()
const {
  getCards,
  createCard,
  deleteCard,
  toggleLike,
} = require('../controllers/cards')
const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validations')

router.get('/', getCards)
router.post('/', validationCreateCard, createCard)
router.delete('/:cardId', validationCardId, deleteCard)
router.put('/:cardId/likes', validationCardId, toggleLike)
router.delete('/:cardId/likes', validationCardId, (req, res, next) =>
  toggleLike(req, res, next, false)
)

module.exports = router
