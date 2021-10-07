import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc Fetch all products
// @routes GET /api/products
// @access Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const product = await Product.find({});

		res.json(product);
	})
);

// @desc Fetch single product
// @routes GET /api/products/:id
// @access Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);

		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ message: 'Product not found' });
		}
	})
);

export default router;
