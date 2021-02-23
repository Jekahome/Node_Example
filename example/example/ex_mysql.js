//Инициализация Node.jsподключения Node.jsк Node.jsбазе Node.jsданных Node.js
//Сначала подключим пакет в программе:
const mysql = require('mysql')
//После этого создадим соединение:
    const options = {
        user: 'the_mysql_user_name',
        password: 'the_mysql_user_password',
        database: 'the_mysql_database_name'
    }
const connection = mysql.createConnection(options)
//Теперь попытаемся подключиться к базе данных:
    connection.connect(err => {
        if (err) {
            console.error('An error occurred while connecting to the DB')
            throw err
        }
    }

connection.query('SELECT * FROM todos', (error, todos, fields) => {
    if (error) {
        console.error('An error occurred while executing the query')
        throw error
    }
    console.log(todos)
})


const id = 223
connection.query('SELECT * FROM todos WHERE id = ?', [id], (error, todos,
                                                            fields) => {
    if (error) {
        console.error('An error occurred while executing the query')
        throw error
    }
    console.log(todos)
})

const id = 223
const author = 'Flavio'
connection.query('SELECT * FROM todos WHERE id = ? AND author = ?', [id,
    author], (error, todos, fields) => {
    if (error) {
        console.error('An error occurred while executing the query')
        throw error
    }
    console.log(todos)
})

// INSERT
const todo = {
    thing: 'Buy the milk'
    author: 'Flavio'
}
connection.query('INSERT INTO todos SET ?', todo, (error, results, fields) => {
    if (error) {
        console.error('An error occurred while executing the query')
        throw error
    }
})


const todo = {
    thing: 'Buy the milk'
    author: 'Flavio'
}
connection.query('INSERT INTO todos SET ?', todo, (error, results, fields) => {
    if (error) {
        console.error('An error occurred while executing the query')
        throw error
    }}
const id = results.resultId
console.log(id)
)


connection.end()