const express = require('express');
const mysql = require('mysql2');  
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 


const db = mysql.createConnection({
    host: 'localhost',
    user: 'Owaish31', 
    password: '@Owaish31',  
    database: 'vision_scan_ai'  
});


db.connect(err => {
    if (err) {
        console.log('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});


app.post('/login', (req, res) => {
    const { name, number } = req.body;
    const sql = 'INSERT INTO users (name, mobile_number) VALUES (?, ?)';

    db.query(sql, [name, number], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Database error');
        }
        res.status(200).send({ id: result.insertId, name, number });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
