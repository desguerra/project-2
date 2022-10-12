const router = require('express').Router();
const sequelize = require('../config/connection');
const { Profile } = require('../models');

router.get('/', (req, res) => {
    Profile.findAll()
        .then((dbProfileData) => {
            const profiles = dbProfileData.map((profile) => profile.get({ plain: true }));

            res.render('homepage', {
                profiles,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;