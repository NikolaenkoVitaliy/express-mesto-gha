const routerUsers = require('express').Router();
const {
  getAllUsers,
  getUserById,
  // createUser,
  updateUser,
  updateUserAvatar,
  getCurrentUserInfo,
} = require('../controllers/users');

routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/me', getCurrentUserInfo);
routerUsers.patch('/users/me', updateUser);
routerUsers.get('/users/:userId', getUserById);
// routerUsers.post('/users', createUser);
routerUsers.patch('/users/me/avatar', updateUserAvatar);
routerUsers.get('/users/me', getUserById);

module.exports = routerUsers;
