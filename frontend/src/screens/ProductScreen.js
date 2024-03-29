import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Card,
	Image,
	ListGroup,
	Button,
	ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${match.params.id}`);

			setProduct(data);
		};

		fetchProduct();
	}, [match]);

	return (
		<>
			<Link to='/'>
				<Button className='btn-light my-3'>Go back</Button>
			</Link>
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
					<Card>
						<ListGroup variant='flush'>
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
							<ListGroupItem>
								<Button
									className='btn-dark w-100'
									disabled={product.countInStock === 0}
								>
									Add to Cart
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
