import { Router } from 'express';
import { Asset } from '../schemas/assets';

const router = Router();

// # ROUTES

// ## [READ] ASSET
router.get('/assets/:slug', async (req, res) => {
	try {
		const { slug } = req.params;
		const asset = await Asset.findOne({ slug });
		if (!asset) {
			throw new Error('Product not found');
		} else {
			res.status(200).json(asset);
		}
	} catch (err: any) {
		const status = 'Product not found' === err.message ? 404 : 400;
		res.status(status).json({ error: err.message });
	}
});

// ## [CREATE] ASSET
router.post('/assets', async (req, res) => {
	console.log('[POST] # PROCESSING GET REQUEST ');
	console.log('[POST] > RESOURCE: `/assets`');
	try {
		const {
			title,
			slug,
			description,
			price,
			amount,
			active,
			assetType,
			tags,
			images,
		} = req.body;

		console.log('- DATA: ');

		const asset = new Asset({
			title,
			slug,
			description,
			price,
			amount,
			active,
			assetType,
			tags,
			images,
		});

		console.log(asset);

		// Important error handling
		if (title.trim().toLowerCase() === 'coffee') {
			throw new Error("I'm a teapot");
		}

		await asset.save();
		res.status(201).json(asset);
		console.log(
			'[CREATED] </> SUCCESS! Created new asset on the database.',
		);
	} catch (err: any) {
		const status = err.message === "I'm a teapot" ? 418 : 400;
		res.status(status).json({ errorMessage: err.message });
		console.log(
			`[POST ERROR ${status}] </> OPS! Could not create new asset due to an error.`,
		);
		console.log(err);
	}
});

// ## [UPDATE] ASSET
router.put('/assets/:slug', async (req, res) => {
	try {
		const { slug } = req.params;
		const {
			title,
			description,
			price,
			amount,
			active,
			assetType,
			tags,
			images,
		} = req.body;

		const asset = await Asset.findOne({ slug });
		if (!asset) {
			throw new Error('Asset not found');
		}

		asset.title = title;
		asset.description = description;
		asset.price = price;
		asset.amount = amount;
		asset.active = active;
		asset.assetType = assetType;
		asset.tags = tags;
		asset.images = images;

		await asset.save();
		res.status(200).json(asset);
		console.log('[UPDATED] </> SUCCESS! Updated asset in the database.');
	} catch (err: any) {
		const status = 'Asset not found' === err.message ? 404 : 400;
		res.status(status).json({ errorMessage: err.message });
		console.log(
			`[PUT ERROR ${status}] </> OPS! Could not update asset due to an error.`,
		);
		console.log(err);
	}
});

// ## [DELETE] ASSET
router.delete('/assets/:slug', async (req, res) => {
	try {
		const { slug } = req.params;

		const asset = await Asset.deleteOne({ slug });
		if (!asset) {
			throw new Error('Asset not found');
		}

		res.status(200).json({ message: 'Asset deleted successfully' });
		console.log('[DELETED] </> SUCCESS! Deleted asset from the database.');
	} catch (err: any) {
		const status = 'Asset not found' === err.message ? 404 : 400;
		res.status(status).json({ errorMessage: err.message });
		console.log(
			`[DELETE ERROR ${status}] </> OPS! Could not delete asset due to an error.`,
		);
		console.log(err);
	}
});

export default router;
