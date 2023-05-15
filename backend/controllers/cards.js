const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({
    name, link, owner: userId,
  })
    .populate(['owner', 'likes'])
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        next(new BadRequestError(message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (!(req.user._id === card.owner._id.toString())) {
        throw new ForbiddenError('Запрещено удалять чужие карточки');
      } else {
        card.deleteOne()
          .then((myCard) => {
            res.status(200).send({ myCard });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректно задан ID карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректно задан ID карточки'));
      } else {
        next(err);
      }
    });
};
