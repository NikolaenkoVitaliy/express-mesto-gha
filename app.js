const express = require("express");
const mongoose = require("mongoose");
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64db8204200d4838c986c18f'
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(routerUsers);
app.use(routerCards);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});