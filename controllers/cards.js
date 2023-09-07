const cardModel = require('../models/card');
const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getAllCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => {
      res.status(STATUS_OK).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  cardModel
    .create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  cardModel
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      } else if (userId !== card.owner.toString()) {
        next(new ForbiddenError('Разрешено удалять только свои карточки'));
      }
      return res.status(STATUS_OK).send({ message: 'Карточка была удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const setLikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  cardModel
    .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      console.log(cardId);
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      return res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const removeLikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  cardModel
    .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
};
