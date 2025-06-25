const express = require("express");
const app = express();
const path = require("path");
port = 8080;
const { v4: uuidv4 } = require("uuid");
const ejsmate = require("ejs-mate");
app.engine("ejs", ejsmate);
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'NODE_APP',
    password: 'your-mysql-password'
});

app.listen(port, (req, res) => {
    console.log(`app is listen on port ${port}`);
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.get("/Student", (req, res) => {
    let q = "SELECT * FROM student";
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err; }
            res.render("Student.ejs", { result });
        })
    } catch {
        res.send("Some err in DB");
    }

});

app.get("/Add", (req, res) => {
    res.render("Add.ejs");
});

app.post("/Add", (req, res) => {
    let { name, cours, email, phone } = req.body;
    let id = uuidv4();
    let q = `INSERT INTO STUDENT (id,name,cours,email,phone) values ('${id}','${name}','${cours}','${email}',${phone})`;
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err; }
            res.redirect("/Student");
        })
    } catch {
        res.send("err in DB");
    }

});

app.patch("/student/search", (req, res) => {
    let { name } = req.body;
    if(name === "all" || name === "All"){
        let q = `SELECT * FROM student`;
        try {
        connection.query(q, (err, result) => {
            if (err) { throw err };
                res.render("Student.ejs", { result });
        })
       } catch {
            res.send("err in DB");
        }
    }
    else{

        let q = `SELECT * FROM student WHERE name = '${name}'`;
        try {
            connection.query(q, (err, result) => {
                if (err) { throw err };
                if (result.length < 1) {
                    res.render("404.ejs");
                }
                else {
                    res.render("Student.ejs", { result });
                }
            })
        } catch {
            res.send("err in DB");
        }
       }
});

app.get("/student/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM student WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err };
            let data = result[0];
            res.render("Edit.ejs", { data });
        })

    } catch {
        res.send("err in DB");
    }
});

app.post("/edit/:id", (req, res) => {
    let { id } = req.params;
    let { name, cours, email, phone } = req.body;
    let q = `UPDATE STUDENT SET  name ='${name}' ,cours='${cours}',email='${email}',phone=${phone} WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err; }
            res.redirect("/Student");
        })
    } catch {
        res.send("err in DB");
    }
});

app.delete("/Student/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `DELETE  FROM STUDENT WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err };
            res.redirect("/Student");
        })

    } catch {
        res.send("err in DB");
    }
});

