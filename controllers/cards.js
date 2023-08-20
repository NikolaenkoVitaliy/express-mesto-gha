const cardModel = require("../models/card");
const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
} = require("../utils/constants");

const getAllCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => {
      console.log(res);
      res.status(STATUS_OK).send(cards);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

const createCard = (req, res) => {
  console.log(req.body);
  const owner = req.user._id;
  const { name, link } = req.body;
  cardModel
    .create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(STATUS_BAD_REQUEST).send({ message: "Invalid Data" });
      }
      console.log(err);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

const deleteCard = (req, res) => {
  console.log(req.params);
  const cardId = req.params.cardId;
  cardModel
    .findById(cardId)
    .then((card) => {
      if (card === null) {
        res.status(STATUS_NOT_FOUND).send({ message: "Card not found" });
      }
      return cardModel.findByIdAndDelete(cardId);
    })
    .then(() => {
      res.status(STATUS_OK).send({ message: "Card has been deleted" });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        res.status(STATUS_BAD_REQUEST).send({ message: "Invalid Data" });
      }
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

const setLikeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  cardModel
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
      { new: true }
    )
    .then((card) => {
      if (card === null) {
        res.status(STATUS_NOT_FOUND).send({ message: "Card Not Found" });
      }
      res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(STATUS_BAD_REQUEST).send({ message: "Invalid Data" });
      }
      console.log(err);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

const removeLikeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  cardModel
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // убрать _id из массива
      { new: true }
    )
    .then((card) => {
      if (card === null) {
        res.status(STATUS_NOT_FOUND).send({ message: "Card Not Found" });
      }
      res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(STATUS_BAD_REQUEST).send({ message: "Invalid Data" });
      }
      console.log(err);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
};
