const mongoose = require('mongoose');
const Listing = require('../models/listing');
const Favourite = require('../models/favourite');

exports.getAddListing = (req, res) => {
    res.render('add-listing',{errors:{}});
};

exports.postAddListing = async (req, res) => {
    try {
        const newlisting = {
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            host: req.session.user.id
        };

        await Listing.create(newlisting);

        res.redirect('/');
    } catch (error) {
        const errors = {};

        for (let field in error.errors) {
            errors[field] = error.errors[field].message;
        }

        res.status(400).render('add-listing', {
            errors
        });
    }
};

exports.postDeleteListing = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(404).send('PG not found');
    }

    const deleted = await Listing.findOneAndDelete({
        _id: id,
        host: req.session.user.id
    });

    if (!deleted) {
        return res.status(404).send('PG not found');
    }

    await Favourite.deleteMany({
        listing: id
    });

    res.redirect('/');
};

exports.getMyListings = async (req, res) => {
    const myListings = await Listing.find({
        host: req.session.user.id
    });

    res.render('my-listings', { myListings });
};

exports.getEditListing = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(404).send('PG not found');
    }

    const listing = await Listing.findOne({
        _id: id,
        host: req.session.user.id
    });

    if (!listing) {
        return res.status(404).send('PG not found');
    }

    res.render('edit-listing', { listing, errors: {} });
};


exports.postEditListing = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(404).send('PG not found');
    }

    try {
        const updatedListing = await Listing.findOneAndUpdate(
            {
                _id: id,
                host: req.session.user.id
            },
            {
                name: req.body.name,
                price: req.body.price,
                location: req.body.location
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedListing) {
            return res.status(404).send('PG not found');
        }

        res.redirect('/host/my-listings');

    } catch (error) {
        const errors = {};

        for (let field in error.errors) {
            errors[field] = error.errors[field].message;
        }

        const listing = await Listing.findOne({
            _id: id,
            host: req.session.user.id
        });

        res.status(400).render('edit-listing', {
            listing,
            errors
        });
    }
};