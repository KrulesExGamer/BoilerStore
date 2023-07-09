import { Router } from 'express';
import { ImageBin } from '../schemas/image_bin';

const router = Router();

// READ images
router.get('/image/:slug', async (req, res) => {
	try {
		const { slug } = req.params;

		// Find the image in the ImageBin collection by slug
		const image = await ImageBin.findOne({ slug });

		if (!image) {
			// If image not found, send a 404 response
			res.status(404).json({ error: 'Image not found' });
			return;
		}

		// Set the appropriate headers
		res.set('Content-Type', image.contentType);

		// Send the image data as the response body
		res.send(image.data);
	} catch (error) {
		// Handle any errors that occurred during the process
		res.status(500).json({ error: 'Internal server error' });
	}
});

// CREATE image
router.post('/images', async (req, res) => {
	try {
		const { data, contentType, slug } = req.body;

		const image = new ImageBin({
			data,
			contentType,
			slug,
		});

		await image.save();
		res.status(201).json(image);
	} catch (err: any) {
		res.status(400).json({ errorMessage: err.message });
	}
});

// UPDATE image
router.put('/images/:slug', async (req, res) => {
	try {
		const { slug } = req.params;
		const { data, contentType } = req.body;

		const image = await ImageBin.findOne({ slug });
		if (!image) {
			throw new Error('Image not found');
		}

		image.data = data;
		image.contentType = contentType;

		await image.save();
		res.status(200).json(image);
	} catch (err: any) {
		const status = 'Image not found' === err.message ? 404 : 400;
		res.status(status).json({ errorMessage: err.message });
	}
});

// DELETE image
router.delete('/images/:slug', async (req, res) => {
	try {
		const { slug } = req.params;

		const image = await ImageBin.findOne({ slug });
		if (!image) {
			throw new Error('Image not found');
		}

		res.status(200).json({ message: 'Image deleted successfully' });
	} catch (err: any) {
		const status = 'Image not found' === err.message ? 404 : 400;
		res.status(status).json({ errorMessage: err.message });
	}
});

export default router;
