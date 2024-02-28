const Order = require('../models/order');
const cron = require('node-cron');

exports.placeOrder = async (req, res) => {
    try {
        const { userId, foodId, paymentMode } = req.body;

        const newOrder = new Order({
            userId,
            foodId,
            paymentMode
        });

        await newOrder.save();

        // Schedule Node-Cron to update order status after 20 minutes
        cron.schedule('*/20 * * * *', async () => {
            await Order.findByIdAndUpdate(newOrder._id, { status: 'canceled' });
        });

        res.json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
