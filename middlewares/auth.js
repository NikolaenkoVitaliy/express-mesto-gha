const jwt = require('jsonwebtoken');
const {
  STATUS_UNAUTHORIZED,
} = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(STATUS_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return res
      .status(STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  return next();
};

module.exports = auth;
