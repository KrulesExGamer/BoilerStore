import { Router } from 'express';
import { AssetType } from '../schemas/asset_type';

const router = Router();

// GET ALL ASSET TYPES
router.get('/assettypes', async (req, res) => {
	try {
		const assetTypes = await AssetType.find();
		res.status(200).json(assetTypes);
	} catch (err: any) {
		res.status(500).json({ error: 'Failed to fetch asset types' });
	}
});

// GET SPECIFIC ASSET TYPE
router.get('/assettypes/:slug', async (req, res) => {
	try {
		const { slug } = req.params;
		const assetType = await AssetType.findOne({ slug });
		if (!assetType) {
			throw new Error('Asset type not found');
		} else {
			res.status(200).json(assetType);
		}
	} catch (err: any) {
		const status = 'Asset type not found' === err.message ? 404 : 400;
		res.status(status).json({ error: err.message });
	}
});

export default router;