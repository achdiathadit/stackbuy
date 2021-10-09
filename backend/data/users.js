import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@stackbuy.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Tony Stark',
		email: 'iloveyou3000@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Steve Rogers',
		email: 'captainfossil@yahoo.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
