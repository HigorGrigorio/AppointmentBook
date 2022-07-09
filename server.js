require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {checkCsrf, locals} = require('./src/middlewares/middleware');


app.use(express.urlencoded({ extended: true }));

//static folder 'public'
app.use(express.static(path.resolve(__dirname, 'public')));

// session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

app.use(session({
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    resave: false,
    saveUninitialized: false,
    cokie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}));

app.use(flash());

const helmet = require('helmet');
const csrf = require('csurf');

// helmet middleware
app.use(helmet());

app.use(csrf());

// check csrf error
app.use(checkCsrf);

// transmit csrf token
app.use(locals);

const routes = require('./routes')

// push routes
app.use(routes);

// path views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs'); // ejs engine

// the app first connects to the database, and then listen the port 3000
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.emit('mongodb-connected');
    })
    .catch(err => console.error(err));

app.on('mongodb-connected', () => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}. http://localhost:${process.env.PORT}`);
    });
});