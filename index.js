const express = require('express')
const mysqldb = require('./mysqldb')
const projectRoute = require('./routes/project')
const userRoute = require('./routes/users')
const app = express();

app.use(express.urlencoded({ Extended: true }))
app.use(express.json())

app.use('/Dashboard', projectRoute)
app.use('/', userRoute)
//app.use('/signin',userRoute.login)


const port = 8080;
app.listen(port, (err) => {
    if (err) {
        throw err
    }
    else {
        console.log(`EXPRESS SERVER IS RUNNING ${port}`)
    }
})


