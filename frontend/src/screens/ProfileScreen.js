import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userContants';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [profileUpdated, setProfileUpdated] = useState(false);
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user || !user.name) {
				dispatch(getUserDetails('profile'));
			} else if (success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails('profile'));
				setProfileUpdated(true);
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		setProfileUpdated(false);
		setMessage(null);

		if (password !== confirmPassword) {
			setMessage(`Password doesn't match`);
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h5>User Profile</h5>
				{message && <Message variant='danger'>{message}</Message>}
				{profileUpdated && (
					<Message variant='success'>
						Profile has been successfully updated
					</Message>
				)}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler} className='my-2'>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email' className='my-3'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter your email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password' className='my-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter your password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword' className='my-3'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm your password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h5>My Orders</h5>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
