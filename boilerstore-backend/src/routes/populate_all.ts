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

const publicPath = path.join(__dirname, '../../public/img');

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


router.get('/populate/all', async (req, res) => {
  try {
	populateDatabase(); // image population

    // Read the JSON files from the public folder
    const assetData = fs.readFileSync('./public/mockup_data/assets.json', 'utf8');
    const gameGenreData = fs.readFileSync('./public/mockup_data/gameGenres.json', 'utf8');
	const assetTypeData = fs.readFileSync('./public/mockup_data/assetTypes.json', 'utf8');
	const usersData = fs.readFileSync('./public/mockup_data/users.json', 'utf8');

    // Parse the JSON data into objects
    const assets = JSON.parse(assetData);
    const gameGenres = JSON.parse(gameGenreData);
	const assetTypes = JSON.parse(assetTypeData);
    const users = JSON.parse(usersData);

    // Populate the Asset collection
    await Asset.insertMany(assets);
    await GameGenre.insertMany(gameGenres);
	await AssetType.insertMany(assetTypes);
	await User.insertMany(users);

    res.status(200).json({ message: 'Database populated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to populate the database' });
  }
});


export default router;


