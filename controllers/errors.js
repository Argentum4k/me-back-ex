const INCORRECT_DATA = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;
const UNAUTHORIZED = 401;// — передан неверный логин или пароль. Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT;
const FORBIDDEN = 403; // — попытка удалить чужую карточку;
const CONFLICT = 409; // при регистрации указан email, который уже существует на сервере

class MestoError extends Error {
// TODO
}

class Error404 extends MestoError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

function error404(req, res) {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
}

module.exports = {
  INCORRECT_DATA, NOT_FOUND, DEFAULT_ERROR, Error404,
};
