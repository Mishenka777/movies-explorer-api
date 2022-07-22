const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validatorLogin, validatorСreateUser } = require('../validate/validate');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validatorСreateUser, createUser);
router.post('/signin', validatorLogin, login);
router.use(auth);
router.use('/users/me', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
