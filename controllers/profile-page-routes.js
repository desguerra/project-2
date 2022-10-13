const router = require('express').Router();
const { User, Profile } = require('../models');
const withAuth = require('../utils/auth');

// get user profile
router.get('/', withAuth, (req, res) => {
    console.log(req.session);

    Profile.findOne({
        where: {
            user_id: req.session.user_id,
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
            res.render('my-profile', {
                profile,
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single profile
router.get('/:id', withAuth, (req, res) => {
    console.log(req.session);
    
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
                user_id: req.session.user_id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit profile
router.get('/edit/:id', withAuth, (req, res) => {
    console.log(req.session);
    
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
                user_id: req.session.user_id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
