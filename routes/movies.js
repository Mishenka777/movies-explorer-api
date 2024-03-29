const movieRouter = require('express').Router();
const { validatorPostMovies, validatorDeleteMovies } = require('../validate/validate');
const {
  getMovies,
  deleteMovies,
  postMovies,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', validatorPostMovies, postMovies);
movieRouter.delete('/:movieId', validatorDeleteMovies, deleteMovies);

module.exports = movieRouter;
