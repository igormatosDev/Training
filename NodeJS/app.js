let express = require('express');
let app = express();

app.set('view engine', 'ejs');


app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html');
});

app.get('/contact', function (req, resp) {
    resp.sendFile(__dirname + '/contact.html');
});

app.get('/profile/:name', function (req, res) {
    let data = {
        age: 19,
        job: 'ninja',
        hobbies: ['eating', 'fighting', 'fishing']
    };
    res.render('profile', {person: req.params.name, data: data});
});

app.listen(3000);