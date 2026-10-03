const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();

authRouter.get('/login', authController.getLogin);

authRouter.get('/signUp', authController.getSignUp);
authRouter.post('/signUp', authController.postSignUp);

authRouter.get('/user-login',authController.getUserLogin);
authRouter.post('/user-login',authController.postUserLogin);

authRouter.post('/logout', authController.postLogout);

authRouter.get('/host-login', authController.getHostLogin);
authRouter.post('/host-login' , authController.postHostLogin);

module.exports= authRouter;
