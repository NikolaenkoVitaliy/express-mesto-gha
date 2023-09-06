const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
} = require('../controllers/cards');
const { regexLink } = require('../utils/constants');

routerCards.get('/cards', getAllCards);
routerCards.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regexLink),
    }),
  }),
  createCard,
);
routerCards.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).required(),
    }),
  }),
  deleteCard,
);
routerCards.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).required(),
    }),
  }),
  setLikeCard,
);
routerCards.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).required(),
    }),
  }),
  removeLikeCard,
);

module.exports = routerCards;
