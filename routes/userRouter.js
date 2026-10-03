const express = require('express');
const userController = require('../controllers/userController');
const userRouter= express.Router();

userRouter.get("/", userController.getHome);

userRouter.get('/allList/:id', userController.getListDetails);


module.exports= userRouter;