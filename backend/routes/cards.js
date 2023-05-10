const router = require('express').Router();
const { celebrate } = require('celebrate');

const { JoiParamsCardID, JoiBodyNameLink } = require('../config/validationConstants');
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate(JoiBodyNameLink), createCard);
router.delete('/:cardId', celebrate(JoiParamsCardID), deleteCardById);
router.put('/:cardId/likes', celebrate(JoiParamsCardID), likeCard);
router.delete('/:cardId/likes', celebrate(JoiParamsCardID), dislikeCard);

module.exports = router;
