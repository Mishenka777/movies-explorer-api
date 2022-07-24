const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const FobiddenError = require('../errors/FobiddenError');

module.exports.postMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

module.exports.deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм не найдена'))
    .then((movie) => {
      if (String(req.user._id) !== String(movie.owner)) {
        return next(new FobiddenError('Нет доступа'));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('некорректные данные'));
      } else {
        next(err);
      }
    });
};
