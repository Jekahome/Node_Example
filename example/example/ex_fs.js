import fs from 'fs';
import path from 'path';

// Открыть асинхронно ----------------------------------
fs.open('/test.txt', 'r', (err, fd) => {
//fd - это дескриптор файла
});
// Открыть синхронно -----------------------------------
try {
    // синхронная операция
    const fd = fs.openSync('/test.txt', 'r')
} catch (err) {
    console.error(err)
}

// path --------------------------------------------------
/*
    const notes = '/users/flavio/notes.txt'
    path.dirname(notes) // /users/flavio
    path.basename(notes) // notes.txt
    path.extname(notes) // .txt
    path.resolve('flavio.txt')// показать абсолютный путь
    path.resolve('tmp', 'flavio.txt')// показать абсолютный путь начиная от папки tmp
    const name = 'flavio'
    path.join('/', 'users', name, 'notes.txt') // '/users/flavio/notes.txt'
    path.normalize('/users/flavio/..//test.txt')// показать реальный путь
*/
// Информация ---------------------------------------------

fs.stat('/test.txt', (err, stats) => {
    if (err) {
        console.error(err)
        return
    }
    /*
        stats.isFile() //true
        stats.isDirectory() //false
        stats.isSymbolicLink() //false
        stats.size //1024000 //= 1MB
    */

    if (stats.isFile())
    {
        fs.open('/test.txt', 'r', (err, fd) => {
          //fd - это дескриптор файла
        });
    }
});

// Чтение файла ------------------------------------------
// readFileSync синхронная версия
fs.readFile('/test.txt', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
});
// Запись в файл ------------------------------------------
// writeFileSync синхронная версия
const content = 'Some content!'
fs.writeFile('/Users/flavio/test.txt', content, { flag: 'a+' }, (err) => {
    if (err) {
        console.error(err)
        return
    }
//файл записан успешно
});

// добавить в конец
const content = 'Some content!'
fs.appendFile('file.log', content, (err) => {
    if (err) {
        console.error(err)
        return
    }
//готово!
});
// Папки ------------------------------------------------
// создание папки
const folderName = '/new_folder'
try {
    if (!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
    }
} catch (err) {
    console.error(err)
}
// чтение папки
fs.readdirSync(folderPath);
// Вот так можно получить полный путь к файлу:
fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName);
};
/*
const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
}
fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)).filter(isFile)
}
*/





//Event: 'newListener'
// Event: 'removeListener'
// emitter.addListener(eventName, listener) - Псевдоним для метода ​ emitter.on()
// emitter.emit(eventName[, ...args]) - вызов события
// emitter.eventNames() - Возвращает массив, который содержит зарегистрированные события.
// emitter.getMaxListeners() - максимальное число обработчиков, которые можно добавить к объекту класса EventEmitter
// emitter.listenerCount(eventName) - Возвращает количество обработчиков события
// emitter.listeners(eventName) - Возвращает массив обработчиков события
// emitter.off(eventName, listener) - Псевдоним для метода ​ emitter.removeListener()
// emitter.on(eventName, listener) - поставить обработчика события
// emitter.once(eventName, listener)  - поставить обработчика события на один раз
// emitter.prependListener(eventName, listener) - обработчик добавляется в начало
// emitter.prependOnceListener(eventName, listener)
// emitter.removeAllListeners([eventName])  - удалить всех обработчиков события
// emitter.removeListener(eventName, listener) - удалить обработчик события
// emitter.setMaxListeners(n)
// emitter.rawListeners(eventName)
// emitter[Symbol.for('nodejs.rejection')](err, eventName[, ...args])


