const router = require('express').Router();
const { User, Profile } = require('../models');
const withAuth = require('../utils/auth');

// get single profile
router.get('/:id', (req, res) => { // FIXME: WITHAUTH, LATER
    Profile.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((dbProfileData) => {
            if (!dbProfileData) {
                res.status(404).json({ message: 'No profile found with this id' });
                return;
            }
            // serialize the data
            const profile = dbProfileData.get({ plain: true });
            // pass data to template
            res.render('profile', {
                profile,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit profile
router.get('/edit/:id', withAuth, (req, res) => {
    Profile.findOne(
        {
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        },
    )
        .then((dbProfileData) => {
            if (!dbProfileData) {
                res.status(404).json({
                    message: 'No profile found with this id :(',
                });
                return;
            }
            // serialize the data
            const profile = dbProfileData.get({ plain: true });
            // pass data to template
            res.render('edit-profile', {
                profile,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
