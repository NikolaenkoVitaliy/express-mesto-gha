const routerCards = require("express").Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
} = require("../controllers/cards");

routerCards.get("/cards", getAllCards);
routerCards.post("/cards", createCard);
routerCards.delete("/cards/:cardId", deleteCard);
routerCards.put("/cards/:cardId/likes", setLikeCard);
routerCards.delete("/cards/:cardId/likes", removeLikeCard);

module.exports = routerCards;
