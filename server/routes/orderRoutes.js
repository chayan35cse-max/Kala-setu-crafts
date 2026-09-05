import express from 'express';
import { getAllOrders, getOrderById, createOrder, requestOrderReturn, addReview } from '../data/store.js';

const router = express.Router();

// GET /api/orders - Get buyer orders
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const orders = await getAllOrders(email);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders/:id/tracking - Fetch India Post tracking timeline
router.get('/:id/tracking', async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Tracking ID or Order not found in India Post Database' });
    }

    res.json({
      success: true,
      data: {
        orderId: order.orderId,
        trackingId: order.trackingId,
        courier: order.courier || 'India Post Speed Post',
        trackingStatus: order.trackingStatus,
        craftName: order.craftName,
        buyerName: order.buyerName,
        shippingAddress: order.shippingAddress,
        orderDate: order.orderDate,
        deliveryDate: order.deliveryDate,
        returnDeadline: order.returnDeadline,
        returnStatus: order.returnStatus,
        timeline: order.trackingTimeline || []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/orders/create - Place an authentic order
router.post('/create', async (req, res) => {
  try {
    const { craftId, craftName, craftImage, artisanId, artisanName, amount, buyerName, buyerEmail, buyerPhone, shippingAddress } = req.body;
    
    if (!craftId || !craftName || !amount) {
      return res.status(400).json({ success: false, error: 'Craft details and amount required' });
    }

    const order = await createOrder({
      craftId,
      craftName,
      craftImage,
      artisanId,
      artisanName,
      amount,
      buyerName: buyerName || 'Chayan Sharma',
      buyerEmail: buyerEmail || 'chayan@example.com',
      buyerPhone: buyerPhone || '+91 98765 43210',
      shippingAddress: shippingAddress || 'Flat 402, Heritage Residency, Indiranagar, Bengaluru - 560038'
    });

    res.status(201).json({
      success: true,
      message: 'Order confirmed! India Post Speed Post consignment registered.',
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/orders/:id/return - Initiate 10-day return request
router.post('/:id/return', async (req, res) => {
  try {
    const { returnReason } = req.body;
    if (!returnReason) {
      return res.status(400).json({ success: false, error: 'Please provide a return reason.' });
    }

    const result = await requestOrderReturn(req.params.id, returnReason);
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: 'Return request submitted successfully under the 10-day return policy. Artisan notified.',
      data: result.order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
