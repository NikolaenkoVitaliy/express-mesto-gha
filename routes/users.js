const routerUsers = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar
} = require("../controllers/users");

routerUsers.get("/users", getAllUsers);
routerUsers.get("/users/:userId", getUserById);
routerUsers.post("/users", createUser);
routerUsers.patch("/users/me", updateUser);
routerUsers.patch("/users/me/avatar", updateUserAvatar);

module.exports = routerUsers;
