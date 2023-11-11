import { QcLog } from './common/quick-converse.js';
import { ConnectToDB } from './core/connect.db.js';
import { StartServer } from './core/server.js';
import dotenv from 'dotenv';
dotenv.config();

export const jwtPrivateKey = process.env.JWT_PRIVATE_SECRET_KEY || '';
export const port = process.env.PORT || '';
export const mongoUri = process.env.MONGO_DB_URI || '';

function BootUp() {
    QcLog.info('System Started !!!');

    if (!jwtPrivateKey) {
        throw Error('ENV not found for jwt');
    }

    if (!port) {
        throw Error('ENV not found for port');
    }

    if (!mongoUri) {
        throw Error('ENV not found for mongo uri');
    }

    // Boot up check and functionality
    // load all env variables 
    // check for db connection
}

BootUp();
StartServer(port);
ConnectToDB(mongoUri);
