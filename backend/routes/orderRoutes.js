const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrder, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/', protect, getMyOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, updateOrderStatus);
router.post('/:id/cancel', protect, cancelOrder);

module.exports = router;
