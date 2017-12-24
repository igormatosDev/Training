let express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html');
});

app.get('/contact', function (req, resp) {
    resp.sendFile(__dirname + '/contact.html');
});

app.get('/profile/:name', function (req, resp) {
    resp.send('You request to see a profile with name of ' + req.params.name)
});

app.listen(3000);
