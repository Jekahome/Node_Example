const mongoose 	= require('mongoose')
const url       = require('../../env.json').mongodb

//Многоразовая функция подключения mongoose
const mongooseConnect = function() {
  mongoose.connect(url, { server: { auto_reconnect: true } })
}

// [Use native promises for backwards compatibility. Mongoose 4 returns mpromise
// promises by default.](http://mongoosejs.com/docs/promises.html)
mongoose.Promise = Promise

//Флаг Mongoose auto_reconnect для true не работает, когда мы получаем ошибку, тогда мы нуждаемся в повторном подключении
mongoose.connection.on('error', function() {
  mongoose.disconnect()
})

mongoose.connection.on('disconnected', function() {
  setTimeout(mongooseConnect, 10240)
})

//подключаться к локальному mongodb по умолчанию, если он не указан в env
mongooseConnect()

/**
 * Эта функция выполняется каждый раз, когда приложение получает запрос и проверяет
 *  mongodb readyState flag: 
 *  0 = disconnected
 *  1 = connected
 *  2 = connecting
 *  3 = disconnecting
 *
 *  @method
 *  @memberOf Mongoose Middleware
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @return {Object} error objec
 */
exports.checkState = function (req, res, next) {
    if (mongoose.connection.readyState !== 1) {
        var err = new Error('Database connection is not established')
        err.status = 500
        next(err)
    }

    next()
}
