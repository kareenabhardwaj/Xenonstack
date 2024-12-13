const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use sessions
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// MySQL Database Connection Setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kareena',
    database: 'new_schema'  // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (isMatch) {
                    req.session.user = results[0];  // Save user in session
                    return res.json({ success: true });
                } else {
                    return res.json({ success: false, message: 'Invalid credentials' });
                }
            });
        } else {
            return res.json({ success: false, message: 'No user found' });
        }
    });
});

// Signup Route
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
            if (err) return res.status(500).send('Error saving user');
            res.json({ success: true });
        });
    });
});

// Property Route
app.get('/properties', (req, res) => {
    db.query('SELECT * FROM properties', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching properties');
        }
        res.json(results);  // Send back properties data
    });
});

// Property Details Route
app.get('/property/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM properties WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching property');
        }
        res.json(results[0]);  // Send back details of the selected property
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
