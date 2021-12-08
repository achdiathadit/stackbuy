import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	ListGroupItem,
	FormControl,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductScreen = ({ history, match }) => {
	const productId = match.params.id;
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		dispatch(addToCart(productId, qty));
		history.push(`/cart`);
	};

	return (
		<>
			<Link to='/'>
				<Button className='btn-light my-3'>Go back</Button>
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid rounded />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h3>{product.name}</h3>
							</ListGroupItem>
							<ListGroupItem>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroupItem>
							<ListGroupItem>
								<strong>Price:</strong> ${product.price}
							</ListGroupItem>
							<ListGroupItem>
								<strong>Description:</strong> {product.description}
							</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={3}>
						<ListGroup>
							<ListGroupItem>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Status:</Col>
									<Col>
										<strong>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</strong>
									</Col>
								</Row>
							</ListGroupItem>
							{product.countInStock > 0 && (
								<ListGroupItem>
									<Row>
										<Col>Qty:</Col>
										<Col>
											<FormControl
												className='form-select'
												as='select'
												value={qty}
												onChange={(e) => setQty(e.target.value)}
											>
												{[...Array(product.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</FormControl>
										</Col>
									</Row>
								</ListGroupItem>
							)}
							<ListGroupItem>
								<Button
									onClick={addToCartHandler}
									className='btn-dark w-100'
									disabled={product.countInStock === 0}
								>
									Add to Cart
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
