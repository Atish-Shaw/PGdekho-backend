const express = require('express');
const hostRouter = express.Router();
const{isHost} = require('../middleware/authMiddleware');

const hostcontroller = require('../controllers/hostController');


hostRouter.get('/add-listing',isHost, hostcontroller.getAddListing);
hostRouter.post('/add-listing',isHost, hostcontroller.postAddListing);
hostRouter.post('/delete-listing/:id',isHost,hostcontroller.postDeleteListing);

hostRouter.get('/my-listings', isHost, hostcontroller.getMyListings);
hostRouter.get('/edit-listing/:id', isHost, hostcontroller.getEditListing);
hostRouter.post('/edit-listing/:id', isHost, hostcontroller.postEditListing);

module.exports = hostRouter;