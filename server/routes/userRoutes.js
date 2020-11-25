const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('./../controllers/authControllers');
// const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// there are 13 routes here

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.post('/forgotPassword', authController.forgotPassword);
// router.put('/resetPassword/:token', authController.resetPassword);
// router.get('/logout', authController.logout);

// // All routes from this middlewares are available to logged in users only
// router.use(protect);

// router.post('/updatePassword', authController.updatePassword);
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
