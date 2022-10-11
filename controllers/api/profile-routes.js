const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require('../../utils/auth');

// get all profiles
router.get('/', (req, res) => {
    Profile.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((dbProfileData) => {
            res.json(dbProfileData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single profile
router.get('/:id', (req, res) => {
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
            res.json(dbProfileData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a new profile
router.post('/', (req, res) => {
    Profile.create({
        display_name: req.body.display_name,
        birthday: req.body.birthday,
        location: req.body.location,
        bio: req.body.bio,
        user_id: req.session.user_id,
    })
        .then((dbProfileData) => {
            req.session.save(() => {
                req.session.user_id = dbProfileData.id;
                req.session.loggedIn = true;

                res.json(dbProfileData);
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit profile
router.put('/:id', (req, res) => { // FIXME: ADD WITHAUTH, ONCE LOGIN IS MADE
    Profile.update(
        {
            display_name: req.body.display_name,
            birthday: req.body.birthday,
            location: req.body.location,
            bio: req.body.bio,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbProfileData) => {
            if (!dbProfileData) {
                res.status(404).json({
                    message: 'No profile found with this id :(',
                });
                return;
            }
            
            res.json(dbProfileData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// profile delete
router.delete('/:id', withAuth, (req, res) => {
    Profile.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbProfileData) => {
            if (!dbProfileData) {
                res.status(404).json({
                    message: 'No profile found with this id :(',
                });
                return;
            }
            res.json(dbProfileData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
