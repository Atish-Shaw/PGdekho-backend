const Favourite = require("../models/favourite");

exports.getFavourites = async (req, res) => {
    const userId = req.session.user.id;

    const allFav = await Favourite.find({
        user: userId
    }).populate("listing");

    const validFav = allFav.filter(fav => fav.listing);

    res.render("favourite", {
        allFav: validFav
    });
};
exports.postFavourites = async (req, res) => {
    const pgId = req.body.id;
    const userId = req.session.user.id;

    const existingFavourite = await Favourite.findOne({
        user: userId,
        listing: pgId
    });

    if (!existingFavourite) {
        await Favourite.create({
            user: userId,
            listing: pgId
        });
    }

    res.redirect(`/allList/${pgId}`);
};

exports.deleteFavourite = async (req, res) => {
    const pgId = req.params.id;
    const userId = req.session.user.id;

    await Favourite.findOneAndDelete({
        user: userId,
        listing: pgId
    });

    res.redirect(`/allList/${pgId}`);
};