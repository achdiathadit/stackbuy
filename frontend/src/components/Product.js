import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { formatUSD } from '../helper/formatCurrencyHelper';

const Product = ({ product }) => {
	return (
		<LinkContainer to={`/product/${product._id}`}>
			<Card className='card card-product border-light my-3 p-3 rounded-4'>
				<Card.Img src={product.image} />

				<Card.Body>
					<Card.Title
						as='div'
						className='card-title'
						data-bs-toggle='tooltip'
						data-bs-placement='bottom'
						title={product.name}
					>
						{product.name}
					</Card.Title>

					<Card.Text as='div'>
						<Rating
							value={product.rating}
							text={` ${product.numReviews} reviews`}
						></Rating>
					</Card.Text>

					<Card.Text as='h5' className='text-dark fw-bold'>
						{formatUSD(product.price)}
					</Card.Text>
				</Card.Body>
			</Card>
		</LinkContainer>
	);
};

export default Product;
