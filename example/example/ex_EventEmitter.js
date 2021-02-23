import {EventEmitter} from 'events';// https://nodejs.org/api/events.html#events_class_eventemitter

const eventEmitter = new EventEmitter();

eventEmitter.on('start', (numb) => {
    console.log('started:%d',numb);
});

eventEmitter.emit('start',23);

//Event: 'newListener'
// Event: 'removeListener'
// emitter.addListener(eventName, listener)
// emitter.emit(eventName[, ...args]) - вызов события
// emitter.eventNames()
// emitter.getMaxListeners()
// emitter.listenerCount(eventName)
// emitter.listeners(eventName)
// emitter.off(eventName, listener)
// emitter.on(eventName, listener) - поставить обработчика события
// emitter.once(eventName, listener)  - поставить обработчика события на один раз
// emitter.prependListener(eventName, listener)
// emitter.prependOnceListener(eventName, listener)
// emitter.removeAllListeners([eventName])  - удалить всех обработчиков события
// emitter.removeListener(eventName, listener) - удалить обработчик события
// emitter.setMaxListeners(n)
// emitter.rawListeners(eventName)
// emitter[Symbol.for('nodejs.rejection')](err, eventName[, ...args])


