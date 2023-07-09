import { Router } from 'express';
import { User } from '../schemas/user';
import { Asset } from '../schemas/asset';

const router = Router();

// AUTHENTICATE USER
router.post('/authenticate', async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			throw new Error('Invalid username or password');
		}

		if (user.password !== password) {
			throw new Error('Invalid username or password');
		}

		res.status(200).json({ message: 'Authentication successful' });
		console.log('[AUTHENTICATED] </> SUCCESS! User authenticated.');
	} catch (err: any) {
		res.status(401).json({ errorMessage: err.message });
		console.log('[POST ERROR 401] </> Authentication failed.');
		console.log(err);
	}
});

export default router;
