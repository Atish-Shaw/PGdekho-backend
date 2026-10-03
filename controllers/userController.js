const mongoose = require('mongoose');
const PG = require('../models/listing');
const Favourite = require('../models/favourite');

exports.getHome = async (req,res)=>{
    const allList = await PG.find();
    res.render('home', {allList});
};


exports.getListDetails = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(404).send('PG not found');
    }

    const selectedId = await PG.findById(id);

    if (!selectedId) {
        return res.status(404).send('PG not found');
    }
    const existingFavourite = req.session.user
        ? await Favourite.findOne({
            user: req.session.user.id,
            listing: id
        })
        : null;

    const isFavourite = !!existingFavourite;

    const isOwner =
        req.session.user &&
        req.session.user.role === 'host' &&
        selectedId.host &&
        selectedId.host.toString() === req.session.user.id.toString();

    res.render('list-details', {
        selectedId,
        isFavourite,
        isOwner
    });
};



