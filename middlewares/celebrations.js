const { celebrate, Joi } = require('celebrate');

const validateUserID = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
    // eslint-disable-next-line max-len
    // avatar: Joi.string().required().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*$/),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

const validateCardID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
});

module.exports = {
  validateUserID, validateProfile, validateAvatar, validateCard, validateCardID,
};
