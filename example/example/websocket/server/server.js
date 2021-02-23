// $ npm install ws
import WebSocketServer from 'ws';


// подключенные клиенты
let clients = {};

// WebSocket-сервер на порту 8081
let webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function(ws) {

    const id = Math.random();
    clients[id] = ws;
    console.info("новое соединение: %d", id);

    ws.on('message', function(message) {
        console.info('получено сообщение: %s ' , message);
        // оповещение всех клиентов
        for (let key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function() {
        console.info('соединение закрыто:  %d' , id);
        delete clients[id];
    });

});