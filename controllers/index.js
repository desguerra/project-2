const router = require('express').Router();

const apiRoutes = require('./api');
const profilePageRoutes = require('./profile-page-routes.js');

router.use('/api', apiRoutes);
router.use('/profile-page', profilePageRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;