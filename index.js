const express = require('express')
const cors = require('cors')    
const http = require("http");
const app = express()
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const { Pool } = require('pg');
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// test route
app.get("/", (req, res) => {
  res.json({ message: "API running ✅" });
});

// ✅ GET all demo users
app.get("/demo-users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM demo_users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST create demo user
app.post("/demo-users", async (req, res) => {
  try {
    const { name, email } = req.body;

    // basic validation
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const result = await pool.query(
      "INSERT INTO demo_users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json({
      message: "User created ✅",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})