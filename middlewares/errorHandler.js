const errorHandler = (err, req, res, next) => {
  const { statusCode } = err.statusCode;
  const message = statusCode === 500 ? 'Произошла ошика на сервере' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
