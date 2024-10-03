const express = require("express");
const router = express.Router();
const index = require('../controller/index');

router.get("/users", index.getAllUsers);
router.get("/users/:id", index.getUserById);
router.post("/users", index.addUser);
router.put("/users/:id",index.updateUser);
router.delete("/users/:id",index.deleteUser);

module.exports = router;
