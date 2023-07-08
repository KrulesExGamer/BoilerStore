import { Schema, model } from 'mongoose';

export const assetSchema = new Schema({
	title: {
		type: String,
		required: true, // a product must have a title
		trim: true, // remove leading or trailing spaces
	},
	slug: {
		// Like an id
		type: String,
		required: [true, 'A slug must be defined.'], // require slug and
		// return a string with an message if it the slug is not provided.
		trim: true,
		index: true, // explicitly stating the slug is an index
		unique: true, // like in sql
	},
	description: {
		type: String,
		required: true,
	},

	seller: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: false,
	},
	active: {
		type: Boolean,
		required: true,
		default: true, // a default value, like in sql
	},

	assetType: [
		{
			type: String,
			required: true,
		},
	],

	tags: [
		{
			type: String,
			required: true,
		},
	],

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

export const Asset = model('Asset', assetSchema);
