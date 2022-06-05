//const { query } = require('express');
const express = require('express');
const con = require('../mysqldb');
const router = express.Router();
const {addProject, searchProject}=require("../controllers/projectControllers")

router.post('/projects',addProject)
router.get('/projects/all/:status/:field/:sort',searchProject)

module.exports = router