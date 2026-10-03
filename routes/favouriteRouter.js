const express = require('express');
const favouriteController = require('../controllers/favouriteController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const favouriteRouter = express.Router();

favouriteRouter.get('/favourite',isLoggedIn, favouriteController.getFavourites);
favouriteRouter.post('/favourite',isLoggedIn, favouriteController.postFavourites);
favouriteRouter.post('/favourite/:id',isLoggedIn,favouriteController.deleteFavourite);

module.exports = favouriteRouter;