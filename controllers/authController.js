const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req,res)=>{
    res.render('login');
};

exports.getSignUp= (req,res)=>{
    res.render('signUp');
}; 

exports.getUserLogin = (req,res)=>{
    res.render('user-login');
};

exports.postUserLogin = async (req,res)=>{
    try{
        const {email,password}= req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send('Invalid email or password');
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).send('Invalid email or password');
        }

        req.session.user = {
            id: user._id,
            name:user.name,
            role:user.role
        }

        res.redirect('/');
    }
    catch(error){
        console.log(error);
        res.status(500).send('Something went wrong');
    }
};

exports.postSignUp = async (req,res)=>{
    try{
        const {name,email,password}= req.body;

        const exsitingUser = await User.findOne({email});

        if(exsitingUser){
            return res.status(404).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            name,
            email,
            password:hashedPassword,
            role:'user'
        });

        res.redirect('/login');
    }
    catch(error){
        console.log(error);
        res.status(500).send('Something went wrong');
    }
};

exports.postLogout = (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log(error);
            return res.status(500).send('Could not log out')
        }
        res.redirect('/');
    });
};

exports.getHostLogin = (req,res)=>{
    res.render('host-login');
};

exports.postHostLogin = async (req,res)=>{
    try{
        const {email , password} = req.body;

        const host =await User.findOne({email});

        if(!host || host.role !=='host'){
            return res.status(400).send('Invalid email or password');
        }

        const isPasswordCorrect = await bcrypt.compare(password,host.password);

        if(!isPasswordCorrect){
            return res.status(400).send('Invalid email or password');
        }

        req.session.user = {
            id: host._id,
            name:host.name,
            role:host.role
        }

        res.redirect('/');
    }
    catch(error){
        console.log(error);
        res.status(500).send('something went wrong');
    }
};