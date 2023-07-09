import { Schema, model } from 'mongoose';

export const gameGenreSchema = new Schema({
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

	icon: {
		type: String,
		required: true,
	},

	examples: [{
		type: String,
		required: false,
	}],
});

export const GameGenre = model('GameGenre', gameGenreSchema);
