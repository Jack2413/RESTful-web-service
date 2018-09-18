var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;
const path = require('path')
const { Pool } = require('pg'); const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: true });

var pg = require('pg').native;
var connectionString = 'postgres://<userid>:password@depot:5432/<userid>_nodejs';

app.get('/', function (req, res) { 
	res.send('Hello World!');
});

app.listen(port, function () {
	console.log('Example app listening on port 8080!');
});





// // app.listen(port, () => console.log(`Listening on port ${port}`));

//invoke functions on a service hosted in a different location
// Add headers
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

app.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views')) 
	.set('view engine', 'ejs')

app.get('/get', async (req, res) => { 
	try {
		const client = await pool.connect();
		var result = await client.query('SELECT * FROM todo');
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

app.get('/', (req, res) => res.render('pages/index')).listen(PORT, () => console.log('Listening on ${ PORT }'))

app.post('/post', async (req, res) => { 
	try {
		const client = await pool.connect();
		var id = req.body.task_id;
		var task = req.body.task;
		var name = req.body.taks_name;
		var result = await client.query("INSERT INTO todo (TASK,NAME) VALUES ($1,$2)",[task,task_name]);
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
	res.render('pages/db', {'data': result.rows});
	client.release();
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
	res.render('pages/db', {'data': result.rows});
	client.release();
	} catch (err) { 
		console.error(err); 
		res.send("Error " + err);
	} 
});

// app.put('/put', async (req, res) => { 
// 	try {
// 		const client = await pool.connect()
// 		var task = req.body.new_taskName;
// 		var id = req.body.previous_index;
// 		var name = req.body.new_taskUser;
// 		var result = await client.query("UPDATE test_table SET TASK = '$1' ,NAME = '$2' WHERE ID = $3",[task,name,id] );
// 		if (!result) {
// 			return res.send('No data found'); 
// 		}else{ 
// 			result.rows.forEach(row=>{ console.log(row);
// 		});
// 	}
// 	res.render('pages/db', {'data': result.rows});
// 	client.release();
// 	} catch (err) { 
// 		console.error(err); 
// 		res.send("Error " + err);
// 	} 
// });


