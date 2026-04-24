const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});


app.get('/api/generalinfo', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM generalinfo WHERE id = 1');
        res.json(result.rows);
    } catch(error){
        console.error('Error Fetching Data', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})
app.get('/api/weekinfo', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM weekinfo WHERE id >= 0');
        res.json(result.rows);
    } catch(error){
        console.error('Error Fetching Data', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.listen(port, () =>{
    console.log(`Server running at http//localhost:${port}`);
})