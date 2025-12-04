const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Register
app.post('/api/register', (req, res) => {
    const { email, password, nombre, apellido_paterno, apellido_materno, empresa, puesto, telefono } = req.body;
    const sql = `INSERT INTO users (email, password, nombre, apellido_paterno, apellido_materno, empresa, puesto, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [email, password, nombre, apellido_paterno, apellido_materno, empresa, puesto, telefono];
    
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'User registered successfully', 
            user: { id: this.lastID, email, nombre, apellido_paterno, apellido_materno } 
        });
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({ 
                message: 'Login successful', 
                user: { 
                    id: row.id, 
                    email: row.email, 
                    nombre: row.nombre,
                    apellido_paterno: row.apellido_paterno,
                    apellido_materno: row.apellido_materno
                } 
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Save Score
app.post('/api/score', (req, res) => {
    const { user_id, score, total_questions } = req.body;
    const sql = `INSERT INTO quiz_history (user_id, score, total_questions) VALUES (?, ?, ?)`;
    
    db.run(sql, [user_id, score, total_questions], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Score saved successfully', id: this.lastID });
    });
});

// Get History
app.get('/api/history/:userId', (req, res) => {
    const sql = `SELECT * FROM quiz_history WHERE user_id = ? ORDER BY date DESC`;
    db.all(sql, [req.params.userId], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ history: rows });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
