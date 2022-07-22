const userRouter = require('express').Router();
const { validatorUpdateUser } = require('../validate/validate');
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

userRouter.get('/', getUserInfo);
userRouter.patch('/', validatorUpdateUser, updateUser);

module.exports = userRouter;
