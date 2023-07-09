import { Schema, model } from 'mongoose';

export const imageBinSchema = new Schema({
	data: {
		type: Buffer,
		required: true,
	},
	contentType: String,
	slug: {
		type: String,
		unique: true,
		required: true,
	}
});

export const ImageBin = model('ImageBin', imageBinSchema);
