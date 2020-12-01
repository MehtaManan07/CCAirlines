const express = require('express');
const { authorize, protect } = require('../middlewares/auth');
const router = express.Router();
const airportController = require('../controllers/airportControllers');

router
  .route('/')
  .get(airportController.getAllAirports)
  .post(protect, authorize('superuser'), airportController.newAirport);
router.get('/gates/:id', airportController.getGates);
router
  .route('/:id')
  .get(protect, authorize('superuser'), airportController.getAirport)
  .put(protect, authorize('superuser'), airportController.updateAirport)
  .delete(protect, authorize('superuser'), airportController.deleteAirport);
module.exports = router;
