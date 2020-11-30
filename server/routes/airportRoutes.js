const express = require('express');
const { authorize, protect } = require('../middlewares/auth');
const router = express.Router();
const airportController = require('../controllers/airportControllers');
const { Airport } = require('../models/AirportModel');


router.use(protect);
router.use(authorize('superuser'));
router
  .route('/')
  .get(airportController.getAllAirports)
  .post(airportController.newAirport)
router.get('/gates/:id',airportController.getGates)
  router.route('/:id')
  .get(airportController.getAirport)
  .put(airportController.updateAirport)
  .delete(airportController.deleteAirport)
module.exports = router;
