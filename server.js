const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// import helper functions we wrote

const helpers = require('./utils/helpers');
// set up handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });


// set up sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// built-in Express.js middleware function that can take
// all of the contents of a folder and serve them as static
// assets. Useful for front-end specific files like images,
// style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, 'public')));

// set up handlebars as app's engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up sessions
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`✨ Now listening on port ${PORT} ✨`));
});