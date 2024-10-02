const pool = require('../config/db');

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM table_test");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Could not get users" });
  }
};

const addUser = async (req, res) => {
  const { name, email, hashed_password } = req.body;
  const join_date = new Date();
  try {
    const result = await pool.query(
      "INSERT INTO table_test (name, email, hashed_password, join_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashed_password, join_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Could not add user" });
  }
};

module.exports = {
  getAllUsers,
  addUser,
};
