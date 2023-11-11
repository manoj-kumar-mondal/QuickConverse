import { connect } from 'mongoose';
import { QcLog } from '../common/quick-converse.js';

let connectionCount = 0;

export const ConnectToDB = (uri: string) => {
    if (connectionCount < 3) {
        QcLog.info('Connecting to Database');
        connect(uri, {
            dbName: 'QuickConverse'
        })
            .then((res) => QcLog.info(`Successfully connect to database`))
            .catch(err => QcLog.error(`Database connection error ${err.message}`));
    }
    connectionCount++;
}