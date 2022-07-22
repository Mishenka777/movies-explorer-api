const { celebrate, Joi } = require('celebrate');

module.exports.validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validatorСreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validatorUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validatorPostMovies = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().min(2).max(30),
    image: Joi.string().min(2).max(30),
    trailer: Joi.string().min(2).max(30),
    nameRU: Joi.string().min(2).max(30),
    nameEN: Joi.string().min(2).max(30),
    thumbnail: Joi.string().min(2).max(30),
    movieId: Joi.number().required(),
  }),
});

module.exports.validatorDeleteMovies = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
