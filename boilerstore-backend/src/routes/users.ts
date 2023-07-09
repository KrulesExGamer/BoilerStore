import { Router } from 'express';
import { User } from '../schemas/user';

const router = Router();

// CREATE USER
router.post('/users', async (req, res) => {
	try {
		const { username, email, password, firstName, lastName, role } =
			req.body;

		const user = new User({
			username,
			email,
			password,
			firstName,
			lastName,
			role,
		});

		await user.save();
		res.status(201).json(user);
		console.log('[CREATED] </> SUCCESS! Created new user on the database.');
	} catch (err: any) {
		res.status(400).json({ errorMessage: err.message });
		console.log(
			'[POST ERROR 400] </> OPS! Could not create new user due to an error.',
		);
		console.log(err);
	}
});

// GET ALL USERS
// router.get('/users', async (req, res) => {
// 	try {
// 		const users = await User.find();
// 		res.status(200).json(users);
// 	} catch (err: any) {
// 		res.status(500).json({ error: 'Failed to fetch users' });
// 	}
// });

// GET USER BY ID
router.get('/users/:username', async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({username});
		if (!user) {
			throw new Error('User not found');
		} else {
			res.status(200).json(user);
		}
	} catch (err: any) {
		const status = 'User not found' === err.message ? 404 : 400;
		res.status(status).json({ error: err.message });
	}
});

// UPDATE USER
router.put('/users/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { username, email, password, firstName, lastName, role } =
			req.body;

		const user = await User.findById(id);
		if (!user) {
			throw new Error('User not found');
		}

		user.username = username;
		user.email = email;
		user.password = password;
		user.firstName = firstName;
		user.lastName = lastName;
		user.role = role;

		await user.save();
		res.status(200).json(user);
		console.log('[UPDATED] </> SUCCESS! Updated user in the database.');
	} catch (err: any) {
		const status = 'User not found' === err.message ? 404 : 400;
		res.status(status).json({ errorMessage: err.message });
		console.log(
			`[PUT ERROR ${status}] </> OPS! Could not update user due to an error.`,
		);
		console.log(err);
	}
});

// DELETE USER
router.delete('/users/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.deleteOne({ id });
		if (!user) {
			throw new Error('User not found');
		}

		res.status(200).json({ message: 'User deleted successfully' });
		console.log('[DELETED] </> SUCCESS! Deleted user from the database.');
	} catch (err: any) {
		const status = 'User not found' === err.message ? 404 : 400;
		res.status(status).json({ errorMessage: err.message });
		console.log(
			`[DELETE ERROR ${status}] </> OPS! Could not delete user due to an error.`,
		);
		console.log(err);
	}
});

export default router;
