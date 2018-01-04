var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://igor.matos:id11402210@ds135547.mlab.com:35547/todo');

//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


// var data = [{item: 'Make bed'}, {item: 'Walk dog'}, {item: 'Play games'}];

var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        // get data from mongo db and pass it to the view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlEncodedParser, function (req, res) {
        // get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        // delete the requested item from mongo db
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};