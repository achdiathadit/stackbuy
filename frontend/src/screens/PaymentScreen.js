import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/place-order');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h5>Payment Method</h5>
			<Form onSubmit={submitHandler} className='my-2'>
				<Form.Group>
					<Form.Label>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						{/* Add other method here */}
					</Col>
				</Form.Group>

				<Button type='submit' variant='primary' className='mt-4'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
