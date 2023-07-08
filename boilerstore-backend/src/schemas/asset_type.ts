import { Schema, model } from 'mongoose';

export const assetTypeSchema = new Schema({
	title: {
		type: String,
		required: true, 
		trim: true, 
	},
	slug: {
		// Like an id
		type: String,
		required: [true, 'A slug must be defined.'], 
		trim: true,
		index: true, 
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},

	images: [
		{
			static: {
				img: { type: String, required: true },
				alt: { type: String, required: true },
			},
			dynamic: {
				img: { type: String, required: false },
				alt: { type: String, required: false },
			},
		},
	],
});

export const AssetType = model('AssetType', assetTypeSchema);
