const express = require('express');
const getProfile = require('../controllers/profile/getProfile');
const isLogged = require('../middlewares/isLogged');
const editProfile = require('../controllers/profile/editProfile');
const userRouter = express.Router();

userRouter.use(isLogged);

userRouter.get('/', getProfile);
userRouter.post('/edit', editProfile);


module.exports = userRouter;