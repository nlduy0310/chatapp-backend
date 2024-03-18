import minimist from 'minimist';
import seedUser from './user';
import mongoose, { mongo } from 'mongoose';
import 'dotenv/config';

type SeederFunction = (hard: boolean) => Promise<void>;
const funcMap = new Map<string, SeederFunction>([['user', seedUser]]);

async function main() {
    const argv = minimist(process.argv.slice(2));

    if (!argv?.name) {
        return console.error('Please provide a name argument');
    }

    const seederFunction = funcMap.get(argv.name);
    if (!seederFunction) {
        return console.error(`Invalid name: %c${argv.name}`, 'color: red');
    }
    let hard = argv._.includes('hard') ? true : false;

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING ?? '');
        console.log('Connected to MongoDB');
    } catch (error) {
        return console.error('Failed to connect to MongoDB: ', error);
    }

    await seederFunction(hard);
    console.log('Seeder completed');
    mongoose
        .disconnect()
        .then(() => {
            console.log('Disconnected from MongoDB');
        })
        .catch((error) => {
            console.error('Failed to disconnect from MongoDB: ', error);
        });
}

main();
