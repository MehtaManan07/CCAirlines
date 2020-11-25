const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('./../controllers/authControllers');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();
const passport = require('passport');

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
  authController.sendTokenResponse(200, req.user, res);
});
router.get('/logout', authController.logout);
// // All routes from this middlewares are available to logged in users only
// router.use(protect);

// router.get('/me', userController.getMe);
// router.put(
//   '/updateMe',
//   userController.uploadPhoto,
//   userController.resizeImage,
//   userController.updateMe
// );
// router.delete('/deleteMe', userController.deleteMe);

// // All routes from this middlewares are available to logged in admin only
// router.use(authorize('admin'));

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
