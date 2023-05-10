const router = require('express').Router();
const { celebrate } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const centralizedErrorHandler = require('../middlewares/centralizedErrorHandler');
const NotFoundError = require('../errors/not-found-err');
const cors = require('../middlewares/cors');

const { JoiBodyEmailPassword, JoiBodyEmailPasswordNameAboutAvatar } = require('../config/validationConstants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate(JoiBodyEmailPassword), login);
router.post('/signup', celebrate(JoiBodyEmailPasswordNameAboutAvatar), createUser);

router.use(auth);

router.use(requestLogger); // подключаем логгер запросов

router.use(cors); // подключаем CORS

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

router.use(centralizedErrorHandler); // центральный обработчик ошибок

module.exports = router;
