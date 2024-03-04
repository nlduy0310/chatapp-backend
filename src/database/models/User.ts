import { Schema, model } from 'mongoose';
import { DEFAULT_PROFILE_IMAGE_URL } from '@configs/defaults';

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	hashedPw: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		default: 'New User',
	},
	imageUrl: {
		type: String,
		default: DEFAULT_PROFILE_IMAGE_URL,
	},
});

const User = model('User', userSchema);
export default User;
