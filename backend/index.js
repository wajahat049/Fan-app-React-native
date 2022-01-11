const express = require("express");
const mysql = require("mysql");
const app = express();
const nodemailer = require("nodemailer")
const path = require('path');
var engines = require('consolidate');
const cors = require('cors')
const csv = require('csv-parser');
const fs = require('fs');
// const { Server } = require("socket.io");
// const io = new Server(server);
app.engine('hbs',engines.mustache);
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// const db = mysql.createConnection({
//     host: 'sql11.freesqldatabase.com',
//     user: 'sql11451804',
//     password: 'lqSm1Rt6DW',
//     database: 'sql11451804'
// });
// // Sample-Spreadsheet-10-rows
// db.connect((error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("MySQL Connected...")
//     }
// });

const publicDirectory = path.join(__dirname, "./views");
app.use(express.static(publicDirectory));
    

// SIGNUP
app.post('/SignUp', (req, res) => {
    // res.send("data")
    console.log("Signup",req.body);
    db.query("INSERT INTO User (Name, Email, Password, Latitude, Longitude) VALUES (?, ?, ?, ?, ?)", [req.body.Name, req.body.Email, req.body.Password,req.body.Latitude, req.body.Longitude], (error, results) => {
            console.log(results)
    })
});


// var fs = require('fs'); // file system module

//     fs.readFile('Sample-Spreadsheet-10-rows.csv', 'utf-8', function(err, data) {
//         if (err) throw err;
    
//         var lines = data.trim().split('\n');
//         var lastLine = lines.slice(-1)[0];
    
//         var fields = lastLine.split(',');
//         const pastfields= lastLine.split(",")
        
        
//     })
fs.readFile('Sample-Spreadsheet-10-rows.csv', 'utf-8', function(err, data) {
    if (err) throw err;

    var lines = data.trim().split('\n');
    var lastLine = lines.slice(-1)[0];

    var fields = lastLine.split(',');   
    console.log("asaasa",fields)
        
app.get("/data",(req,res)=>{
    // var fs = require('fs'); // file system module
        console.log(fields);
        res.send(`<h1>First Name: ${fields[0]}</h1>
        <h1>Last Name: ${fields[1]}</h1>
        <h2>Email: ${fields[2]}</h2>
        `)
    });
 
})

// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });

app.get('/SignUp', (req, res) => {
    res.send("data")
    console.log("Login",req.body);

})


app.post("/ForgetEmail",(req,res)=>{
    console.log(req.body.Email)
    var email = req.body.Email;
    var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'wajjuwajahat123@gmail.com', // Your email id
    pass: '03162150074@' // Your password
    }
    });
    var mailOptions = {
    from: 'wajjuwajahat123@gmail.com',
    to: email,
    subject: 'Reset Password Link - Authentication App',
    html: `<p>You requested for reset password, kindly use this <a href="http://auth-sql-app.herokuapp.com/Reset_Password/?${email}">link</a> to reset your password</p>`
    };
    mail.sendMail(mailOptions, function(error, info) {
    if (error) {
    console.log(1)
    } else {
    console.log(0)
    }
    });
})

app.get("/Reset_Password",(req,res)=>{

    res.render("ReEnterPass",{email:Object.keys(req.query)[0]})
    

})

//  LOGIN
app.get('/Login', async (req, res) => {
 
        db.query('SELECT * FROM User',(error, results) => {

            res.send(results)
            
        })

})

app.get("/",(req,res)=>{
    res.send("Hello world")
})


app.post("/Login",(req,res)=>{
    res.send("Login")
})

app.post("/ChangePass",(req,res)=>{
    console.log("body",req.body)
    db.query('UPDATE User SET ? WHERE Email = ?', [{ Password: req.body.pass}, req.body.email], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results)
            res.render("PasswordChanged")
        }
    });
 
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
})