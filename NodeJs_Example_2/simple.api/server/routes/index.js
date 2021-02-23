const noteRoutes = require('./note_routes');

module.exports = function(app, db,callback) {
    noteRoutes(app, db,callback);
    // Тут, позже, будут и другие обработчики маршрутов
};