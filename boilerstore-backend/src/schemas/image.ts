import { Schema, model } from 'mongoose';

export const imageBinSchema = new Schema({
	data: Buffer,
	contentType: String,
});

export const ImageBin = model('ImageBin', imageBinSchema);
