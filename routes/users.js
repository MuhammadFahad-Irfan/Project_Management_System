const express = require('express');
const con = require('../mysqldb');
const jwt = require('jsonwebtoken')
const router = express.Router();

const bcrypt = require('bcrypt');
const { query } = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const saltRounds = 10;

router.post('/register', (req, res, next) => {
    let user = req.body;
    let isuser = null
    const query = `select * from users where email='${user.email}'`;
    con.query(query, (err, results) => {
        if (err) {
            throw err
        }

        isuser = results
        console.log(isuser)


        if (isuser == null || isuser.length == 0) {


            let query = "insert into users(firstname,lastname,contact,email,password) values(?,?,?,?,?)"

            let hash = bcrypt.hashSync(req.body.password, saltRounds);

            con.query(query, [user.firstname, user.lastname, user.contact, user.email, hash], (err, results) => {

                if (!err) {
                    return res.status(200).json({
                        message: "USER IS ADDED TO THE TABLE SUCESSFULLY",

                    })





                }
                else {
                    return res.status(500).json(err)

                }
            })

        }
        else {
            return res.status(500).json({
                message: "USER IS ALREADY EXIST"
            })
        }
    })


})

router.post('/login', (req, res, next) => {
    var email = req.body.email;

    var password = req.body.password
    let query = `select email,password from users where users.email='${email}' limit 1 `;
    con.query(query, async (err, results) => {
        const a = results[0].email

        if (!err) {
            let authenticated = false;
            authenticated = await bcrypt.compare(password, results[0].password)
            if (authenticated) {

                const query = `select user_id from users where users.email='${email}' `;
                const token = jwt.sign(query, "mynameisfahdirfannqeqweqrwetoertieoydoioidfgodfjdjfdkljdjl")
                console.log(token)
                return res.status(200).json({
                    message: "AUTEHNTICATED",
                    token

                })
            }




            else {
                return res.status(500).json({
                    message: "EMAIL PASSWORD INCORRECT"
                })
            }
        }

        else {
            return res.status(500).json({
                message: "ERROR FROM LOGGED IN"
            })
        }
    })
})
module.exports = router;