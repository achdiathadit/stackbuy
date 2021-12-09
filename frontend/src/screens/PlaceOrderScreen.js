import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { formatUSD } from '../helper/formatCurrencyHelper';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	cart.itemsPrice = cart.cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);
	cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
	cart.taxPrice = 0.15 * cart.itemsPrice;
	cart.totalPrice =
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h5>Shipping</h5>
							<p>
								<strong>Address: </strong> {cart.shippingAddress.address},{' '}
								{cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h5>Payment Method</h5>
							<p>
								<strong>Method: </strong> {cart.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h5>Ordered Items</h5>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={2}>
													{item.qty} x {formatUSD(item.price)}
												</Col>
												<Col md={2}>= {formatUSD(item.qty * item.price)}</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup>
						<ListGroup.Item>
							<h5>Order Summary</h5>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Items</Col>
								<Col>{formatUSD(cart.itemsPrice)}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping</Col>
								<Col>{formatUSD(cart.shippingPrice)}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Tax</Col>
								<Col>{formatUSD(cart.taxPrice)}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Total</Col>
								<Col>{formatUSD(cart.totalPrice)}</Col>
							</Row>
						</ListGroup.Item>
						{error && (
							<ListGroup.Item>
								<Message variant='danger my-0'>{error}</Message>
							</ListGroup.Item>
						)}
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-dark w-100'
								disabled={cart.cartItems.length === 0}
								onClick={placeOrderHandler}
							>
								Place Order
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</div>
	);
};

export default PlaceOrderScreen;
