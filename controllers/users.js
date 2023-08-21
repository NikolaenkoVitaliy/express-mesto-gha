const userModel = require('../models/user');
const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
} = require('../utils/constants');

const getAllUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => {
      console.log(res);
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  userModel
    .findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: 'User Not Found' });
      }
      return res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_BAD_REQUEST).send({ message: 'Incorrect ID' });
      }
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel
    .create({ name, about, avatar })
    .then((user) => {
      res.status(STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_BAD_REQUEST).send({ message: 'Invalid Data' });
      }
      console.log(err);
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: 'User Not Found' });
      }
      return res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        return res.status(STATUS_BAD_REQUEST).send({ message: 'Invalid Data' });
      }
      console.log(err);
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: 'User Not Found' });
      }
      return res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_BAD_REQUEST).send({ message: 'Invalid Data' });
      }
      console.log(err);
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
