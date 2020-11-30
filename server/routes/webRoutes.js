const express = require('express');
const router = express.Router();
const webController = require('../controllers/webControllers');
// const { protect } = require('../middlewares/auth');
router.post('/:pnr', webController.chechkIn);
router.post('/change', webController.selectSeat);
router.put('/baggage/:bookingId', webController.checkBaggage);

module.exports = router;
