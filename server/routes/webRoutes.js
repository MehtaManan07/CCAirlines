const express = require('express');
const router = express.Router();
const webController = require('../controllers/webControllers');

router.post('/change', webController.selectSeat)

module.exports = router;