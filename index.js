var express = require('express');
var app = express();
//var router = express.Router();
var port = process.env.PORT || 8080;
var bodyParser = require ('body-parser');
//var DATABASE_URL = 'postgres://wewcmmzrcaubfs:13a35e258a45f4671a295a69570853853d2c4b364a8d66405a26bde1170b2fdf@ec2-54-83-4-76.compute-1.amazonaws.com:5432/d303lm4ceipfkg';
const path = require('path');
const { Pool } = require('pg'); 
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true 
});


// var pg = require('pg').native;
// var connectionString = 'postgres://<userid>:password@depot:5432/<userid>_nodejs';

// app.get('/', function (req, res) { 
// 	res.send('Hello World!');
// });

// app.listen(port, function () {
// 	console.log('Example app listening on Heroku Server');
// });

// // app.listen(port, () => console.log(`Listening on port ${port}`));
app.use (express.static(path.join(__dirname + '/front-end')));
//invoke functions on a service hosted in a different location
// Add headers
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
// Website you wish to allow to connect res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Origin', '*');
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Request headers you wish to allow ,
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow- Headers');
// Pass to next layer of middleware
next(); 
});

//rest api functions

// app.use(express.static(path.join(__dirname, 'public')))
// 	.set('views', path.join(__dirname, 'views')) 
// 	.set('view engine', 'ejs')

app.get('/get', async (req, res) => { 
	try {
		const client = await pool.connect();
		var result = await client.query('SELECT * FROM todo');
		if (!result) {
			return res.send('No data found'); 
		}else{ 
			//return res.send(result.rows);
			return res.send(result.rows);
			//result.rows.forEach(row=>{ console.log(row);
			//});
		}
	//res.render('front-end/', {'tasks': result.rows});
	client.release();
	} catch (err) { 
		console.error(err); 
		res.send("Error " + err);
	} 
});

app.post('/post', async (req, res) => { 
	try {
		const client = await pool.connect();
		console.log(req.body);
		console.log(req.body["task"]);
		var task = req.body.task;
		var name = req.body.task_name;
		var state = req.body.state;
		console.log(task+' '+name+' '+state);
		//console.log('Task: $2 Name: $3 state: $4',[task,name,state]);
		var result = await client.query('INSERT INTO todo (TASK,NAME,STATE) VALUES ($1,$2,$3)',[task,name,state]);
		if (!result) {
			console.log('not insert success');
			return res.send('not insert success'); 
		}else{
			console.log('insert success'); 
			result.rows.forEach(row=>{ console.log(row);
		});
	}
	//res.render('pages/db', {'data': result.rows});
	client.release();
	} catch (err) { 
		console.error(err); 
		res.send("Error " + err);
	} 
});



app.delete('/delete', async (req, res) => { 
	try {

		const client = await pool.connect();
		var task = req.body.task;
		var result = await client.query("DELETE FROM todo WHERE task = $1 ",[task] );
		if (!result) {
			return res.send('No data found'); 
		}else{ 
			result.rows.forEach(row=>{ console.log(row);
		});
	}
	//res.render('pages/db', {'data': result.rows});
	//client.release();
	} catch (err) { 
		console.error(err); 
		res.send("Error " + err);
	} 
});

app.put('/update', async (req, res) => { 
	try {
		const client = await pool.connect()
		var task = req.body.new_taskName;
		var id = req.body.previous_index;
		var name = req.body.new_taskUser;
		var result = await client.query("UPDATE test_table SET TASK = '$1' ,NAME = '$2' WHERE ID = $3",[task,name,id] );
		if (!result) {
			return res.send('No data found'); 
		}else{ 
			result.rows.forEach(row=>{ console.log(row);
		});
	}
	//res.render('pages/db', {'data': result.rows});
	//client.release();
	} catch (err) { 
		console.error(err); 
		res.send("Error " + err);
	} 
});

app.get('/', (req, res) => res.render('pages/index'))
	.listen(port, () => console.log('Listening on Heroku Server'))

app.put('/put', async (req, res) => { 
	try {
		const client = await pool.connect()
		var task = req.body.new_taskName;
		var id = req.body.previous_index;
		var name = req.body.new_taskUser;
		var result = await client.query("UPDATE test_table SET TASK = '$1' ,NAME = '$2' WHERE ID = $3",[task,name,id] );
		if (!result) {
			return res.send('No data found'); 
		}else{ 
			result.rows.forEach(row=>{ console.log(row);
		});
	}
	res.render('pages/db', {'data': result.rows});
	client.release();
	} catch (err) { 
		console.error(err); 
		res.send("Error " + err);
	} 
});


