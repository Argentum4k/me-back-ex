const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { error404 } = require('./controllers/errors');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.set('runValidators', true); // чтобы валидация на апдейты работала
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(cookieParser()); // парсер кук
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.post('/signin', login);
app.post('/signup', createUser);
// авторизация
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', error404);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(
  PORT,
  () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    // запрещено линтером, поэтому
    /* eslint-disable no-console */
    console.log(`App listening on port ${PORT}`);
    /* eslint-enable no-console */
  },
);
