require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabase = require('./database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Register
app.post('/api/register', async (req, res) => {
    const { email, password, nombre, apellido_paterno, apellido_materno, empresa, puesto, telefono } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([{ email, password, nombre, apellido_paterno, apellido_materno, empresa, puesto, telefono }])
            .select('id, email, nombre, apellido_paterno, apellido_materno')
            .single();
        
        if (error) throw error;
        
        res.json({ 
            message: 'User registered successfully', 
            user: data
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, email, nombre, apellido_paterno, apellido_materno')
            .eq('email', email)
            .eq('password', password)
            .single();
        
        if (error) throw error;
        
        if (data) {
            res.json({ 
                message: 'Login successful', 
                user: data
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        if (err.code === 'PGRST116') {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
});

// Save Score
app.post('/api/score', async (req, res) => {
    const { user_id, score, total_questions } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('quiz_history')
            .insert([{ user_id, score, total_questions }])
            .select('id')
            .single();
        
        if (error) throw error;
        
        res.json({ message: 'Score saved successfully', id: data.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get History
app.get('/api/history/:userId', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('quiz_history')
            .select('*')
            .eq('user_id', req.params.userId)
            .order('date', { ascending: false });
        
        if (error) throw error;
        
        res.json({ history: data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
