const express = require('express');
const userController = require('./../controllers/userControllers');
const authController = require('./../controllers/authControllers');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();
const passport = require('passport');
const advancedResults = require('../utils/filterFeatures');
const User = require('../models/UserModel');

// there are 13 routes here

router.post('/signup', authController.signup);
// auth login
router.post('/login', authController.login);

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
console.log(req.originalUrl + '\n')
  authController.sendTokenResponse(200, req.user, res);
});
router.get('/logout', authController.logout);

// // All routes from this middlewares are available to logged in users only
router.use(protect);
router.get('/me', userController.getMe);

// // All routes from this middlewares are available to logged in admin only
// router.use(authorize('superuser'));

router
  .route('/')
  .get(advancedResults(User, 'bookings'), userController.getAllUsers);

module.exports = router;
