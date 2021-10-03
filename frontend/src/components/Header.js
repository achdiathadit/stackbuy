import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar variant='light' bg='light' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Stackbuy</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse
						id='basic-navbar-nav'
						className='justify-content-end'
					>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link className='mx-3'>
									<i class='fas fa-shopping-basket' /> Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/login'>
								<Nav.Link>
									<i class='fas fa-user-circle' /> Sign in
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
