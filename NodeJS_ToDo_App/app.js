var express = require('express');
var ejs = require('ejs');
var todoController = require('./controllers/todoController');

app = express();

//set up templates engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');