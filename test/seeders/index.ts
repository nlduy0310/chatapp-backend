import minimist from 'minimist';
import seedUser from './user';
import mongoose from 'mongoose';
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
    await seederFunction(hard);
    return console.log('Seeder completed');
}

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING ?? '')
    .then(async () => {
        console.log('Connected to MongoDB');
        await main();
    })
    .catch((err) => {
        console.log(err);
        console.error('Can not connect to MongoDB');
    })
    .finally(async () => {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    });
