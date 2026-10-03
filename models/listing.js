const mongoose= require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'PG name is required'],
        minlength: [3, 'PG name must be at least 3 characters']
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1000, 'Price must be at least ₹1000']
    },

    location: {
        type: String,
        required: [true, 'Location is required'],
        minlength: [3, 'Location must be at least 3 characters']
    },
    
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports= mongoose.model('Listing',listingSchema);