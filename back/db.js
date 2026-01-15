const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Silva080167', 
    database: 'sistema_academico'
});

db.connect(err => {
    if (err) {
        console.error(' Erro MySQL:', err);
    } else {
        console.log(' MySQL conectado');
    }
});

module.exports = db;
