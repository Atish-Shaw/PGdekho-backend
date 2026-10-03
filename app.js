const path = require('path');

require('dotenv').config();

const express = require('express');
const session = require('express-session');
const {MongoStore} = require('connect-mongo');
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// local
const rootDir = require('./utils/pathUtils');
const hostRouter = require('./routes/hostRouter');
const userRouter = require('./routes/userRouter');
const favouriteRouter = require('./routes/favouriteRouter');
const authRouter = require('./routes/authRouter');

const app = express();

// settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// middlewares
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// routes
app.use(userRouter);
app.use(authRouter);
app.use(favouriteRouter);
app.use('/host', hostRouter);

const port = 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));