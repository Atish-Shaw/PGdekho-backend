const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        minLength:[3,'Name must have atleast 3 letters']
    },

    email:{
        type:String,
        required:[true,'Enter email'],
        unique:true
    },

    password:{
        type:String,
        required:[true,'Must enter a password'],
        minLength:[6,'Must have atlest 6 letters']
    },

    role:{
        type:String,
        enum:['user','host'],
        default:'user'
    }
});

module.exports= mongoose.model('User',userSchema);