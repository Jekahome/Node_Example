import http from 'http';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

// Чтение файла полностью в память
/*
    const server = http.createServer(function (req, res) {
        fs.readFile(__dirname + '/data.txt', (err, data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            res.end(data)
        })
    });
*/

const server = http.createServer((req, res) => {
    var readOptions = {
          'flags': 'r',
          'encoding': 'utf-8',
          'mode': '0666',
          'bufferSize': 4 * 1024
    };
    const stream = fs.createReadStream(__dirname + '/data.txt',readOptions);
    stream.encoding="utf8";
    stream.pipe(res);

    setTimeout(() => {
        stream.close();
        stream.push(null);
        stream.read(0);
    }, 100);
});

server.listen(3000);

/*
Поток для чтения (​ Readable ​ ) — это поток, из которого можно читать данные. Записывать
данные в такой поток нельзя. Когда в такой поток поступают данные, они буферизуются до того
момента пока потребитель данных не приступит к их чтению.

Поток для записи (​ Writable ​ ) — это поток, в который можно отправлять данные. Читать из него данные нельзя.

Дуплексный поток (​ Duplex​ ) — в такой поток можно и отправлять данные и читать их из него. По
существу это — комбинация потока для чтения и потока для записи.

Трансформирующий поток (​ Transform ​ ) — такие потоки похожи на дуплексные потоки, разница
заключается в том, что то, что поступает на вход этих потоков, преобразует то, что из них можно прочитать.
 */

//Создание Node.js потока Node.jsдля Node.js чтения Node.js
//Поток для чтения можно создать и инициализировать, воспользовавшись возможностями модуля stream​ :
const Stream = require('stream')
const readableStream = new Stream.Readable()
//Теперь в поток можно поместить данные, которые позже сможет прочесть потребитель этих данных:
readableStream.push('hi!')
readableStream.push('ho!')
//Создание потока для Node.js записи
//Для того чтобы создать записываемый поток нужно расширить базовый объект ​ Writable ​ и
//реализовать его метод ​ _write() ​ . Для этого сначала создадим соответствующий поток:
const Stream = require('stream')
const writableStream = new Stream.Writable()
//Затем реализуем его метод ​ _write() ​ :
writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString())
    next()
}
//Теперь к такому потоку можно подключить поток, предназначенный для чтения:
process.stdin.pipe(writableStream)

//Получение Node.jsданных Node.jsиз Node.jsпотока Node.jsдля Node.jsчтения Node.js
//Для того чтобы получить данные из потока, предназначенного для чтения, воспользуемся потоком для записи:
const Stream = require('stream')
const readableStream = new Stream.Readable()
const writableStream = new Stream.Writable()
writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString())
    next()
}
readableStream.pipe(writableStream)
readableStream.push('hi!')
readableStream.push('ho!')
readableStream.push(null)
//Команда ​ readableStream.push(null) ​ сообщает об окончании вывода данных.
// Работать с потоками для чтения можно и напрямую, обрабатывая событие ​ readable ​ :
readableStream.on('readable', () => {
    console.log(readableStream.read())
})
//Отправка Node.jsданных Node.jsв Node.jsпоток Node.jsдля Node.jsзаписи Node.js
//Для отправки данных в поток для записи используется метод ​ write() ​ :
writableStream.write('hey!\n')
//Сообщение Node.jsпотоку Node.jsдля Node.jsзаписи Node.jsо Node.jsтом, Node.jsчто Node.jsзапись Node.jsданных Node.jsзавершена Node.js
//Для того чтобы сообщить потоку для записи о том, что запись данных в него завершена, можно воспользоваться его методом ​ end()​ :
writableStream.end()


