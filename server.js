const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql');
const PORT = 8000;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	"extended": "true"
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'thuesday13'
});

// добавляння товару
app.post('/goods-add', function(req, res) {
    connection.query('INSERT INTO goods SET ?', req.body, function(err, result) {
        if(err) throw err;
        console.log('user added to database with id: ' +result.insertId);
    });
    res.sendStatus(200);
})

// регистрація акаунту
app.post('/login-reg', function(req, res) {
    connection.query('INSERT INTO users SET ?', req.body, function(err, result) {
        if(err) throw err;
        console.log('user added to database with id: ' +result.insertId);
    });
    res.sendStatus(200);
})

//змінити пароль
app.post('/login-change', function(req, res) {
    connection.query('UPDATE users SET password = ? WHERE login = ?', [req.body.password,req.body.login], function(err, result) {
        if(err) throw err;
    });
    res.sendStatus(200);
})



// app.post('/login', function (req, res) {
//     var user = [{
//             login: "user1",
//             pass: "123"
// },
//         {
//             login: "user2",
//             pass: "123"
// }, {
//             login: "user3",
//             pass: "123"
// }
//            ]
//
//     for(var i=0; i<user.length; i++) {
//         if (req.body.login == user[i].login) {
//             if (req.body.password == user[i].pass) {
//                 res.status(200).send("Welcome " + user[i].login);
// 				break;
//             } else {
//                 res.status(200).send("Wrong password");
// 				break;
//             }
//         } else {
//             res.status(200).send("Wrong login");
// 			break;
//         }
//     }
// })




app.get("*",function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});


//Запус сервера
app.listen(PORT, function (err){
	if (err) throw err;
	console.log("Server start on port 8000!");
});
