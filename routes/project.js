//const { query } = require('express');
const express = require('express');
const con = require('../mysqldb');
const router = express.Router();

router.post('/projects', (req, res, next) => {
    let project = req.body;
    query = "insert into projects(proj_name,descp,start_date,status,labels,git_repo,img) values(?,?,?,?,?,?,?)"
    con.query(query, [project.proj_name, project.desc, project.start_date, project.status, project.Labels, project.git_repo, project.img], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Project Addedd Sucessfully" })

        }
        else {
            return res.status(500).json({
                message: "ERROR OCCURED IN ADDING PROJECT", err
            })
        }

    })
})


router.get('/projects/all/:status/:field/:sort', (req, res, next) => {
    const stat = req.params.status
    //let project=req.body.status
    //query=`select * from projects where projects.status= ? order by '${start_date}' ;`;
    query = `select * from projects where projects.status = ? order by ${req.params.field} ${req.params.sort} `
    console.log(query)
    con.query(query, [stat], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err)
        }
    });
})

module.exports = router