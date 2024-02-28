const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/place-order', orderController.placeOrder);
router.post('/place-order', orderController.submitFeedback);

module.exports = router;
