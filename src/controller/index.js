const pool = require('../config/db');

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM table_test");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Could not get users" });
  }
};

const getUserById = async(req,res)=>{
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM table_test WHERE user_id=$1", [id]);
    if (!result.rows[0]) return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error getting user by ID:", err);
    res.status(500).json({ error: "Could not get user" });
  }
}

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

const updateUser = async (req,res)=>{
  const {id}=req.params
  const {  name, email, hashed_password } = req.body;
  try {
    const result = await pool.query(
      "UPDATE table_test SET name=$1, email=$2, hashed_password=$3 WHERE user_id=$4 RETURNING *",
      [name, email, hashed_password, id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Could not update user" });
  }
}

const deleteUser = async(req,res)=>{
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM table_test WHERE user_id=$1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Could not delete user" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
