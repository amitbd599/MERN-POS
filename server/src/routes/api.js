const express = require("express");

const UserController = require("../controllers/UserController");

const router = express.Router();



//! User routes
router.post("/register-user", UserController.RegisterUser);




module.exports = router;
