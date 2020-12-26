const express = require('express');
const router = express.Router();
const webController = require('../controllers/webControllers');
// const { protect } = require('../middlewares/auth');
router.post('/change', webController.selectSeat);
router.post('/:pnr', webController.chechkIn);
router.put('/baggage/:bookingId', webController.checkBaggage);
router.get('/:id', webController.generateBoardingPass);

module.exports = router;
