const express = require('express');
// const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// built-in Express.js middleware function that can take
// all of the contents of a folder and serve them as static
// assets. Useful for front-end specific files like images,
// style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, 'public')));


// turn on routes
// app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`✨ Now listening on port ${PORT} ✨`));
});