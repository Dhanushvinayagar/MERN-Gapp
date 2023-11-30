const express = require("express");
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());


const pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DB
});

app.get('/', (req, res) => {
    res.send("Welcome to graphql server page");
});

app.get('/person', async (req, res) => {
    try {
      
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                res.status(500).json({ error: err.message });
                return;
            }

            const sqlQuery = 'SELECT * FROM user';

            connection.query(sqlQuery, (queryErr, result) => {
                connection.release();

                if (queryErr) {
                    console.error('Error executing query:', queryErr);
                    res.status(500).json({ error: queryErr.message });
                    return;
                }

                console.log("result", result);
                res.send({ person: result });
            });
        });
    } catch (err) {
        console.error("Found error : ", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log("server page (graphql) started on port ", port);
});
