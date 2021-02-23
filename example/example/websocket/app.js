import express from 'express';

const port = 3005;

// создаём Express-приложение
let app = express();
app.use(express.static('websocket/client'));// расшарить папку с index.html

// создаём маршрут для главной страницы
app.get('/page', function(req, res) {
     res.sendFile('index.html');
});

// запускаем сервер на порту 8080
app.listen(port);
// отправляем сообщение
console.info(`Сервер стартовал :  http://localhost:${port}`);


