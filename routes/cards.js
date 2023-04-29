const router = require('express').Router()
const {
  getCards,
  createCard,
  deleteCard,
  toggleLike,
} = require('../controllers/cards')

router.get('/', getCards)
router.post('/', createCard)
router.delete('/:cardId', deleteCard)
router.put('/:cardId/likes', (req, res) => toggleLike(req, res))
router.delete('/:cardId/likes', (req, res) => toggleLike(req, res, false))

module.exports = router
