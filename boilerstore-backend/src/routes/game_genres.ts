import { Router } from 'express';
import { GameGenre } from '../schemas/game_genre';

const router = Router();

// GET ALL GAME GENRES
router.get('/gamegenres', async (req, res) => {
	try {
		const gameGenres = await GameGenre.find();
		res.status(200).json(gameGenres);
	} catch (err: any) {
		res.status(500).json({ error: 'Failed to fetch game genres' });
	}
});

// GET SPECIFIC GAME GENRE
router.get('/gamegenres/:slug', async (req, res) => {
	try {
		const { slug } = req.params;
		const gameGenre = await GameGenre.findOne({ slug });
		if (!gameGenre) {
			throw new Error('Game genre not found');
		} else {
			res.status(200).json(gameGenre);
		}
	} catch (err: any) {
		const status = 'Game genre not found' === err.message ? 404 : 400;
		res.status(status).json({ error: err.message });
	}
});

export default router;
