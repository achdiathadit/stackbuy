import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create new order
// @routes POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No ordered items');
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

// @desc Get order by ID
// @routes GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email	'
	);

	// if (order) {
	// 	res.json(order);
	// } else {
	// 	res.status(404);
	// 	throw new Error('Order not found');
	// }

	// Alternative --> Check if the request was from an admin or if the order user ID was equal to the request user ID
	if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

export { addOrderItems, getOrderById };
