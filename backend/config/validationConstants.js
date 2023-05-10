const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { urlRegular } = require('./constants');

module.exports = Object.freeze({
  JoiBodyEmailPassword: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
  JoiBodyEmailPasswordNameAboutAvatar: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlRegular),
    }),
  },
  JoiParamsUserID: {
    params: Joi.object().keys({
      userId: Joi.objectId().required(),
    }),
  },
  JoiBodyNameAbout: {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  },
  JoiBodyAvatar: {
    body: Joi.object().keys({
      avatar: Joi.string().regex(urlRegular).required(),
    }),
  },
  JoiParamsCardID: {
    params: Joi.object().keys({
      cardId: Joi.objectId().required(),
    }),
  },
  JoiBodyNameLink: {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(urlRegular),
    }),
  },
});
