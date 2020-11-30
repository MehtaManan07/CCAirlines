const express = require('express');
const router = express.Router();
const webController = require('../controllers/webControllers');
// const { protect } = require('../middlewares/auth');
router.post('/', webController.chechkIn);
router.post('/change', webController.selectSeat);

module.exports = router;
