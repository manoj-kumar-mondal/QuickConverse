import { Application, json, urlencoded } from 'express';
import cors from 'cors';
import authRouter from './auth.js';
import { QcLog } from '../common/quick-converse.js';

export default function ExpressAppHandler(app: Application) {
    app.use(cors());
    app.use(urlencoded({ extended: true }));
    app.use(json());

    app.use((req, res, next) => {
        QcLog.log(`<REQ> <--- ${req.hostname} ${req.method.toLocaleUpperCase()} ${req.path}`);
        res.on('finish', () => {
            QcLog.log(`<RES> ---> ${res.statusCode} ${req.method.toLocaleUpperCase()} ${req.path}`);
        });
        next();
    });

    app.use('/auth', authRouter);

    app.get('/', (req, res) => {
        res.status(500).send('Internal Server Error');
    });

    app.use('/', (req, res, next) => {
        return res.status(404).json({
            message: `route not found for '${req.path}' for method ${req.method.toUpperCase()}`
        });
    });
}