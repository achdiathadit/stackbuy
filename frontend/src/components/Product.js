import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<LinkContainer to={`/product/${product._id}`}>
			<Card className='card card-product border-light my-3 p-3 rounded'>
				<Card.Img src={product.image} variant='top' />

				<Card.Body>
					<Card.Title as='div' className='card-title'>
						<strong>{product.name}</strong>
					</Card.Title>

					<Card.Text as='div'>
						<Rating
							value={product.rating}
							text={` ${product.numReviews} reviews`}
						></Rating>
					</Card.Text>

					<Card.Text as='h5'>${product.price}</Card.Text>
				</Card.Body>
			</Card>
		</LinkContainer>
	);
};

export default Product;
