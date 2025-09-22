// index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// setup postgres connection pool
const pool = new Pool({
  user: process.env.DB_USER, // e.g. 'postgres'
  host: process.env.DB_HOST, // e.g. 'localhost'
  database: process.env.DB_NAME, // e.g. 'todoapp'
  password: process.env.DB_PASS, // e.g. 'postgres'
  port: process.env.DB_PORT, // e.g. 5432
});
pool.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      console.log("Connected to DB at:", res.rows[0].now);
      client.release();
    })
    .catch((err) => {
      client.release();
      console.error("Error running test query", err.stack);
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// test route
app.get("/", (req, res) => {
  res.send("Hello from Todo backend");
});
app.post("/api/todos", async (req, res) => {
  try {
    const { title, completed, timeframe } = req.body;

    const result = await pool.query(
      `INSERT INTO todos (title, completed, timeframe, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [title, completed, timeframe,]
    );
// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

    res.json(result.rows[0]); // send back the new todo
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
