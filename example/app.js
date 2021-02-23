import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;



// http.METHODS - список методов
// http.STATUS_CODES - Коллекция всех стандартных кодов состояния ответа HTTP и краткое описание каждого из них.
// http.Server http.createServer([options][, requestListener]) - создает сервер https://nodejs.org/docs/v15.8.0/api/http.html#http_class_http_server
// http.get(url[, options][, callback])
// http.request(url[, options][, callback])



const server = http.createServer((req, res) => {
// req обьект класса http.IncomingMessage расширяет класс stream.Readable
// res ​обьект класса http.ServerResponse расширяет класс stream.Writable
// http.IncomingMessage https://nodejs.org/docs/v15.8.0/api/http.html#http_class_http_incomingmessage
//      Event:'aborted' - Выдается, когда запрос был прерван.
//      Event:'close' - Указывает, что базовое соединение было закрыто.
// req.message.complete - проверка был ли прерван запрос
// req.message.complete - полное сообщение HTTP было получено и успешно проанализировано.
// req.message.destroy([error]) -  Вызывает destroy () для сокета
// req.message.headers - обьект заголовков request/response
// req.message.method - метод запроса (только для запроса http.Server ) https://nodejs.org/docs/v15.8.0/api/http.html#http_class_http_server
// req.message.rawHeaders - Необработанные заголовки request/response
// req.message.setTimeout(msecs[, callback]) - вызов setTimeout
// req.message.socket - обьект класса net.Socket  наследует <stream.Duplex> https://nodejs.org/docs/v15.8.0/api/stream.html#stream_class_stream_duplex https://nodejs.org/docs/v15.8.0/api/net.html#net_class_net_socket
// req.message.statusCode - статус (только от запроса http.ClientRequest) https://nodejs.org/docs/v15.8.0/api/http.html#http_class_http_clientrequest
// req.message.statusMessage - сообщение статуса "OK" (только от запроса http.ClientRequest)
// req.message.trailers
// req.message.url - Строка URL-адреса запроса (только для запроса http.Server )


// stream.Readable https://nodejs.org/docs/v15.8.0/api/stream.html#stream_class_stream_writable
//      Event:'error'
//      Event:'data'
//      Event:'end'




    const {headers, method, url} = req;
    let body = [];

    req.on('aborted',(t)=>{
      console.log('Запрос был прерван?',req.message.complete);


    }).on('close',(t)=>{

    })
      .on('error',(err) => {
       console.error(err);
    }).on('data',(chunk) => {
       // POST
      // Example: curl -d '{"hello":"world"}' -H "Content-Type: application/json" -X POST 127.0.0.1:3000
       body.push(chunk);
    }).on('end',()=>{
       body = Buffer.concat(body).toString();
       res.on('error',(err)=>{
           console.error(err);
       });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const responseBody = { headers, method, url, body };
        res.write(JSON.stringify(responseBody));
        res.end();
    });

   // res.statusCode = 200;
   // res.setHeader('Content-Type', 'text/plain');
   // res.end('Hello World');
});

process.on('SIGTERM', () => {
    app.close(() => {
        console.log('Process terminated')
    })
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// http.Server  https://nodejs.org/docs/v15.8.0/api/http.html#http_class_http_server
// Event: 'checkContinue'
// Event: 'clientError'
// Event: 'close'
// Event: 'connect'
// Event: 'connection'
// Event: 'request'
// Event: 'upgrade'
// server.close([callback])
// server.headersTimeout
// server.listen()
// server.listening
// server.maxHeadersCount
// server.requestTimeout
// server.setTimeout([msecs][, callback])
// server.timeout
// server.keepAliveTimeout








