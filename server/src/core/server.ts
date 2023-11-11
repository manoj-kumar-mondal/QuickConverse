import { createServer } from 'http';
import express from 'express';
import ExpressAppHandler from '../routes/index.js'
import SocketIoHandler from './socket.js';
import { QcLog } from '../common/quick-converse.js';

export const StartServer = (port: string) => {
    const app = express();
    const httpServer = createServer(app);

    ExpressAppHandler(app);
    // SocketIoHandler(httpServer);

    httpServer.listen(port, () => QcLog.info(`Server is running at port ${port}`));
};

