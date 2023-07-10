import { Schema, model } from 'mongoose';

export const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},

	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	cart: [{
		type: String,
		required: false,
	}],
});

export const User = model('User', userSchema);
