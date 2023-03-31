const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'data-node',
    password : '1501'
})

module.exports = pool.promise();