const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, 'Введите Имя'],
    },
    email: {
      type: String,
      required: [true, 'Введите E-mail'],
      unique: true,
      validate: [validator.isEmail, 'некорректный E-mail'],
    },
    password: {
      type: String,
      required: [true, 'Введите Пароль'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error({ message: 'Неправильные почта или пароль' }));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error({ message: 'Неправильные почта или пароль' }));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
