import { error } from 'console';
import mongoose from 'mongoose';

mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected to MongoDB'));

export async function connect(): Promise<[boolean, string]> {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING ?? '');
        return [true, 'Connected to MongoDB'];
    } catch (err) {
        return [false, `Can not connect to MongoDB: ${err}`];
    }
}

export async function disconnect(): Promise<[boolean, string]> {
    try {
        await mongoose.disconnect();
        return [true, 'Disconnected from MongoDB'];
    } catch (err) {
        return [false, `Can not disconnect from MongoDB: ${err}`];
    }
}
