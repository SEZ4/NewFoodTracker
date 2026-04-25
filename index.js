const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
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

/*cron.schedule('0 0 * * 0', async () => {
    try{
        await pool.query(`UPDATE weekinfo SET first_meal = '', second_meal = '', day_calorie = '' WHERE id >= 0`);
        await pool.query(`UPDATE generalinfo SET daily_calorie = '', current_weight = '' WHERE id = 1`)
    } catch (error){
        console.error('Error Scheduled Clearing Data', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
}) */

app.post('/reset-week', async (req, res) => {
    try{
        await pool.query(`UPDATE weekinfo SET first_meal = '', second_meal = '', day_calorie = '' WHERE id >= 0`);
        await pool.query(`UPDATE generalinfo SET daily_calorie = NULL, current_weight = NULL WHERE id = 1`);

        res.send("Weekly reset complete");
    } catch (error){
        console.error(error);
        res.status(500).send("Error resetting week");
    }
})

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
        const result = await pool.query(`SELECT * FROM weekinfo WHERE id >= 0 
            ORDER BY CASE stored_day
            WHEN 'sunday' THEN 1
            WHEN 'monday' THEN 2
            WHEN 'tuesday' THEN 3
            WHEN 'wednesday' THEN 4
            WHEN 'thursday' THEN 5
            WHEN 'friday' THEN 6
            WHEN 'saturday' THEN 7 
        END;`);

        res.json(result.rows);
    } catch(error){
        console.error('Error Fetching Data', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})
app.put('/api/updategeneralinfo', express.json(), async (req, res) => {
    const { value, place } = req.body;
    try{
        const result = await pool.query(`UPDATE generalinfo SET ${place} = $1 WHERE id = 1 RETURNING *`,
            [value]
        );
    } catch(error){
        console.error('Error Updating Data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.put('/api/updateweekinfo', express.json(), async (req, res) => {
    const { firstMeal, secondMeal, calorie, place } = req.body;
    try{
        const result = await pool.query(`UPDATE weekinfo SET first_meal = $1, second_meal = $2, day_calorie = $3 WHERE stored_day = $4 RETURNING *`,
            [firstMeal, secondMeal, calorie, place]
        );
    } catch(error){
        console.error('Error updating data', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.put('/api/delteweekinfo', express.json(), async (req, res) => {
    try{
        const result = await pool.query(`UPDATE weekinfo SET first_meal = '', second_meal = '', day_calorie = '' WHERE id >= 0`);
    } catch(error){
        console.error('Error deleting data', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.listen(port, () =>{
    console.log(`Server running at http//localhost:${port}`);
})