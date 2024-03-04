import User from '@database/models/User';
import rawData from './data';
import { hashSync } from 'bcrypt';
import { NROUND_PASSWORD_HASH } from '@configs/defaults';
import { ArrayElement } from '../types';

function preprocessData(
	raw: typeof rawData
): (Omit<ArrayElement<typeof rawData>, 'password'> & { hashedPw: string })[] {
	const result = raw.map((user) => {
		return {
			email: user.email,
			hashedPw: hashSync(user.password, NROUND_PASSWORD_HASH),
			displayName: user.displayName,
			imageUrl: user.imageUrl,
		};
	});

	return result;
}

export default async function seedUser(hard: boolean = false) {
	const processedData = preprocessData(rawData);

	if (hard) {
		await User.deleteMany();
		await User.insertMany(processedData);
	} else {
		await Promise.all(
			processedData.map(async (processedUser) => {
				await User.findOneAndUpdate(
					{
						email: processedUser.email,
					},
					processedUser,
					{
						upsert: true,
					}
				);
			})
		);
	}
}
