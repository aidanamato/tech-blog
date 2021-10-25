const router = require('express').Router();

const homeUserRoutes = require('./home-user-routes');
const loginSignupRoutes = require('./login-signup-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeUserRoutes);
router.use('/', loginSignupRoutes);
router.use('/', dashboardRoutes);

module.exports = router;