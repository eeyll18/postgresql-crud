const express = require("express");
const router = express.Router();
const index = require('../controller/index');

router.get("/users", index.getAllUsers);
router.post("/users", index.addUser);

module.exports = router;
