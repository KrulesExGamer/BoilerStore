import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import { ImageBin, imageBinSchema } from '../schemas/image_bin';
import { Router } from 'express';
import { Asset } from '../schemas/asset';
import { AssetType } from '../schemas/asset_type';
import { GameGenre } from '../schemas/game_genre';
import { User } from '../schemas/user';

const router = Router();

const publicPath = path.join(__dirname, '../../public');

function populateDatabase(): void {
	fs.readdir(publicPath, async (err, files) => {
		if (err) {
			console.error('Failed to read directory:', err);
			return;
		}

		for (const file of files) {
			const imagePath = path.join(publicPath, file);

			try {
				const image = fs.readFileSync(imagePath);
				const contentType = getContentType(file);

				const newImage = new ImageBin({
					data: image,
					contentType: contentType,
					slug: file,
				});

				await newImage.save();
				console.log(`Image '${file}' saved to the database.`);
			} catch (error) {
				console.error(
					`Failed to save image '${file}' to the database:`,
					error,
				);
			}
		}
	});
}

function getContentType(filename: string): string {
	const extension = path.extname(filename).toLowerCase();

	switch (extension) {
		case '.jpg':
		case '.jpeg':
			return 'image/jpeg';
		case '.png':
			return 'image/png';
		case '.gif':
			return 'image/gif';
		default:
			return 'application/octet-stream';
	}
}

router.get('/populate/images', (req: Request, res: Response) => {
	populateDatabase();
	res.send('Images population process initiated.');
});

router.post('/populate/assets', async (req, res) => {
	console.log('[POST] # PROCESSING GET REQUEST ');
	console.log('[POST] > RESOURCE: `/assets`');

	try {
		const assetsData = req.body; // Array of assets data

		console.log('- DATA: ');

		const createdAssets = await Promise.all(
			assetsData.map(async (assetData: any) => {
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
				} = assetData;

				const asset = new Asset({
					title,
					slug,
					description,
					price,
					amount,
					active,
					tags,
					images,
				});

				console.log(asset);

				// Important error handling
				if (title.trim().toLowerCase() === 'coffee') {
					throw new Error("I'm a teapot");
				}

				await asset.save();
				return asset;
			}),
		);

		res.status(201).json(createdAssets);
		console.log(
			'[CREATED] </> SUCCESS! Created new assets on the database.',
		);
	} catch (err: any) {
		const status = err.message === "I'm a teapot" ? 418 : 400;
		res.status(status).json({ errorMessage: err.message });
		console.log(
			`[POST ERROR ${status}] </> OPS! Could not create new assets due to an error.`,
		);
		console.log(err);
	}
});

router.post('/populate/assettypes', async (req: Request, res: Response) => {
	try {
		const assetTypesData = req.body; // Array of asset types data

		const createdAssetTypes = await Promise.all(
			assetTypesData.map(async (assetTypeData: any) => {
				const { title, slug, description, icon, examples } =
					assetTypeData;

				const assetType = new AssetType({
					title,
					slug,
					description,
					icon,
					examples,
				});

				await assetType.save();
				return assetType;
			}),
		);

		res.status(201).json(createdAssetTypes);
		console.log(
			'[CREATED] </> SUCCESS! Created new asset types on the database.',
		);
	} catch (err: any) {
		res.status(400).json({ errorMessage: err.message });
		console.log(
			'[POST ERROR 400] </> OPS! Could not create new asset types due to an error.',
		);
		console.log(err);
	}
});

router.post('/populate/gamegenres', async (req: Request, res: Response) => {
	try {
		const gameGenresData = req.body; // Array of game genres data

		const createdGameGenres = await Promise.all(
			gameGenresData.map(async (gameGenreData: any) => {
				const { title, slug, description, icon, examples } =
					gameGenreData;

				const gameGenre = new GameGenre({
					title,
					slug,
					description,
					icon,
					examples,
				});

				await gameGenre.save();
				return gameGenre;
			}),
		);

		res.status(201).json(createdGameGenres);
		console.log(
			'[CREATED] </> SUCCESS! Created new game genres on the database.',
		);
	} catch (err: any) {
		res.status(400).json({ errorMessage: err.message });
		console.log(
			'[POST ERROR 400] </> OPS! Could not create new game genres due to an error.',
		);
		console.log(err);
	}
});

router.post('/populate/users', async (req, res) => {
	try {
		const usersData = req.body; // Array of user data

		const createdUsers = await User.create(usersData);

		res.status(201).json(createdUsers);
		console.log(
			'[CREATED] </> SUCCESS! Created new users on the database.',
		);
	} catch (err: any) {
		res.status(400).json({ errorMessage: err.message });
		console.log(
			'[POST ERROR 400] </> OPS! Could not create new users due to an error.',
		);
		console.log(err);
	}
});

export default router;
