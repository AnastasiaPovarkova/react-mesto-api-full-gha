const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

function findByIdDecorator(id, res, next) {
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
}

module.exports.aboutUser = (req, res, next) => {
  const { _id } = req.user;
  findByIdDecorator(_id, res, next);
};

module.exports.getUserById = (req, res, next) => {
  const _id = req.params.userId;
  findByIdDecorator(_id, res, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.status(200).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }).send({ email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        next(new BadRequestError(message));
      } else if (err.code === 11000) {
        next(new ConflictError('Email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

function updateUserInfoDecorator(data, req, res, next) {
  const { name, about, avatar } = data;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        next(new BadRequestError(message));
      } else {
        next(err);
      }
    });
}

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  updateUserInfoDecorator({ name, about }, req, res, next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserInfoDecorator({ avatar }, req, res, next);
};
