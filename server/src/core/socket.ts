import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

export default function SocketIoHandler(httpServer: HTTPServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log(socket);
    });
}