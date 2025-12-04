const sqlite3 = require('sqlite3').verbose();
const dbName = 'basededatos.db';

const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            nombre TEXT,
            apellido_paterno TEXT,
            apellido_materno TEXT,
            empresa TEXT,
            puesto TEXT,
            telefono TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Users table created or already exists.');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS quiz_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            score INTEGER,
            total_questions INTEGER,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Quiz history table created or already exists.');
            }
        });
    }
});

module.exports = db;
