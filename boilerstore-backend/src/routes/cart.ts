import { Router } from 'express';
import { User } from '../schemas/user';
import { Asset } from '../schemas/asset';

const router = Router();

// ADD ASSET TO CART
router.post('/cart/add', async (req, res) => {
	try {
		const { userId, assetId, quantity } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			throw new Error('User not found');
		}

		const asset = await Asset.findById(assetId);
		if (!asset) {
			throw new Error('Asset not found');
		}

		const cartItem = user.cart.find(
			(item) => item.assetId.toString() === assetId,
		);
		if (cartItem) {
			// Asset already exists in the cart, update quantity
			cartItem.quantity += quantity;
		} else {
			// Asset does not exist in the cart, add it
			user.cart.push({ assetId, quantity });
		}

		await user.save();
		res.status(200).json({ message: 'Asset added to cart' });
		console.log('[UPDATED] </> SUCCESS! Asset added to cart.');
	} catch (err: any) {
		res.status(400).json({ errorMessage: err.message });
		console.log('[POST ERROR 400] </> OPS! Could not add asset to cart.');
		console.log(err);
	}
});

// BUY ASSETS
router.post('/cart/buy', async (req, res) => {
	try {
		const { userId } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			throw new Error('User not found');
		}

		// Assuming you have a logic to process the purchase and update relevant data

		// Clear the cart after successful purchase
		user.cart = [];

		await user.save();
		res.status(200).json({ message: 'Purchase completed successfully' });
		console.log('[PURCHASED] </> SUCCESS! Purchase completed.');
	} catch (err: any) {
		res.status(400).json({ errorMessage: err.message });
		console.log(
			'[POST ERROR 400] </> OPS! Could not complete the purchase.',
		);
		console.log(err);
	}
});

export default router;
