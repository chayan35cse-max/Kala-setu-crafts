import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrderStatus, requestOrderReturn, deleteOrder } from '../data/store.js';

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

// GET /api/orders/:id - Get single order by ID or tracking number
router.get('/:id', async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
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

const handleCreateOrder = async (req, res) => {
  try {
    const { craftId, craftName, craftImage, artisanId, artisanName, amount, buyerName, buyerEmail, buyerPhone, shippingAddress, quantity } = req.body;
    
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
      quantity: quantity || 1,
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
};

// POST /api/orders/create and POST /api/orders - Place an authentic order
router.post('/create', handleCreateOrder);
router.post('/', handleCreateOrder);

// PUT /api/orders/:id/status - Update tracking status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, location, description } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'New tracking status is required.' });
    }

    const updated = await updateOrderStatus(req.params.id, status, location, description);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Order not found to update status.' });
    }

    res.json({
      success: true,
      message: `Order status updated to "${status}".`,
      data: updated
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

// DELETE /api/orders/:id - Cancel or delete order
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteOrder(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Order not found to delete.' });
    }
    res.json({
      success: true,
      message: 'Order cancelled and removed successfully.',
      data: deleted
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
