const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Order = require('../Models/userModel');
const Product = require('../Models/productModel');
const User = require('../Models/userModel');

// Create Payment Intent (Link User with Product)
const PaymentIntent= async (req, res) => {
    const { productId, userId, quantity } = req.body;

    try {
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        if (!product || !user) {
            return res.status(404).json({ message: 'Product or User not found' });
        }

        const totalAmount = product.price * quantity;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: 'usd',
            metadata: { productId, userId }
        });

        // Create Order associated with User and Product
        const order = await Order.create({
            UserId: user.id,
            ProductId: product.id,
            totalAmount,
            paymentIntentId: paymentIntent.id,
            status: 'pending'
        });

        res.json({ clientSecret: paymentIntent.client_secret, orderId: order.id });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Confirm Payment
const confirmPayment= async (req, res) => {
    const { paymentIntentId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const order = await Order.findOne({ where: { paymentIntentId } });

        if (paymentIntent.status === 'succeeded') {
            order.status = 'paid';
            await order.save();
            res.json({ message: 'Payment successful', order });
        } else {
            res.status(400).json({ message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {confirmPayment, PaymentIntent};
