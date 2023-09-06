const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUserInfo,
} = require('../controllers/users');
const { regexLink } = require('../utils/constants');

routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/me', getCurrentUserInfo);
routerUsers.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).required(),
    }),
  }),
  getUserById,
);
routerUsers.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

routerUsers.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regexLink),
    }),
  }),
  updateUserAvatar,
);

module.exports = routerUsers;
