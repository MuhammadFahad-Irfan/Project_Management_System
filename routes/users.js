const express = require('express');
const con = require('../mysqldb');
const router = express.Router();
const saltRounds = 10;
const userRoute = require("../controllers/userControllers")

router.post('/register', userRoute.userRegister)
router.post('/login', userRoute.userLogin)

module.exports = router;