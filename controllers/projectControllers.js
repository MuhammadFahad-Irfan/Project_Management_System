const con=require("../mysqldb")
exports.addProject = (req,res)=>{
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
}

exports.searchProject=(req,res)=>{
    const stat = req.params.status
    query = `select * from projects where projects.status = ? order by ${req.params.field} ${req.params.sort} `
    con.query(query, [stat], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err)
        }
    });

}

