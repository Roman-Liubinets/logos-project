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

//отримання товару
app.get('/goods', function (req, res) {
    connection.query('SELECT * FROM goods', function (err, rows) {
        if (err) throw err;
        console.log('get all itemses, length: ' + rows.length);
        res.status(200).send(rows);
    });
});

//Змінити товар
app.post('/goods-change', function (req, res) {
    connection.query('UPDATE goods SET name = ?, price = ? WHERE id = ?', [req.body.name, req.body.price, req.body.id],
        function (err) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});

//Чат надіслати повідомлення
app.post('/chat-send-message', function(req, res) {
    connection.query('INSERT INTO chat SET ?', req.body, function(err, result) {
        if(err) throw err;
        console.log('user added to database with id: ' +result.insertId);
    });
    res.sendStatus(200);
})


//Отримати повідомлення
app.get('/chat', function (req, res) {
    connection.query('SELECT * FROM chat', function (err, rows) {
        if (err) throw err;
        console.log('get all itemses, length: ' + rows.length);
        res.status(200).send(rows);
    });
});

//Авторизація
app.post('/login-auth', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            if (rows[0].password == req.body.password) {
                res.status(200).send("welcome");
            } else {
                res.status(200).send("wrong password");
            }
        } else {
            res.status(200).send("wrong login");
        }
    });
});

//Реєстрація
app.post('/login-reg', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            res.status(200).send("Choose another login!");
        } else {
            connection.query('INSERT INTO users SET ?', req.body,
                function (err, result) {
                    if (err) throw err;
                    console.log('user added to database with id: ' + result.insertId);

					connection.query('INSERT INTO userpage SET name = ?, sname = ?, date = ?, about', [req.body.name, req.body.sname, req.body.date, req.body.about],
		                function (err, result) {
		                    if (err) throw err;
		                    console.log('user added to database with id: ' + result.insertId);
		                }
					);
                }

            );
            res.status(200).send(req.body.login + " registered!");
        }
    });
});



//Завантажити дані авторизованого юзера
app.post('/user-prof', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            connection.query('SELECT * FROM userpage  WHERE users_id = ?', rows[0].id,
                function (err, result) {
                    if (err) throw err;
                    res.status(200).send(result);
                }
            );
        } else {
            res.status(200).send("User is undefined");
        }
    });
});

//Отримати юзерів
app.get('/users', function (req, res) {
    connection.query('SELECT * FROM users', function (err, rows) {
        if (err) throw err;
        console.log('get all itemss, length: ' + rows.length);
        res.status(200).send(rows);
    });
});




app.get("*",function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});


//Запус сервера
app.listen(PORT, function (err){
	if (err) throw err;
	console.log("Server start on port 8000!");
});
