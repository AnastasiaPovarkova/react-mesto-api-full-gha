const router = require('express').Router();
const { celebrate } = require('celebrate');

const { JoiParamsUserID, JoiBodyNameAbout, JoiBodyAvatar } = require('../config/validationConstants');
const {
  getUsers, aboutUser, getUserById, updateUserInfo, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', aboutUser);
router.get('/:userId', celebrate(JoiParamsUserID), getUserById);
router.patch('/me', celebrate(JoiBodyNameAbout), updateUserInfo);
router.patch('/me/avatar', celebrate(JoiBodyAvatar), updateAvatar);

module.exports = router;
