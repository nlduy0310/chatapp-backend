import 'dotenv/config';
import app from './app';

// ----- Routes -----
import route from '@routes/index';
route(app);

// ----- Connect -----
import { connect as connectDB, disconnect as disconnectDB } from '@database/index';
import { handle as handleAsync } from '@utils/async-operations';
const PORT = process.env.PORT || 3000;

function listen() {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

function logError(err: any) {
    console.error(err);
}

handleAsync(connectDB, false, true).then(listen).catch(logError);
