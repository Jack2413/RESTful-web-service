var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', function (req, res) { 
	res.send('Hello World!');
});

app.listen(port, function () {
	console.log('Example app listening on port 8080!');
});

// var ERROR_LOG = console.error.bind(console); 
// $.Ajax({
// method: 'POST',
// url: 'http://localhost:8080/my_post_function/', data: JSON.stringify({
// task: task.find('.task').html() }),
// contentType: "application/json",
// dataType: "json" }).then(my_next_function, ERROR_LOG);

// // Add headers
// app.use(function (req, res, next) {
// // Website you wish to allow to connect res.setHeader('Access-Control-Allow-Origin', '*')
// // // Request methods you wish to allow
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// // Request headers you wish to allow ,
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow- Headers');
// // Pass to next layer of middleware
// next(); });