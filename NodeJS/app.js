let express = require('express');
let app = express();

app.get('/', function (req, resp) {
    resp.send('This is a homepage');
});

app.get('/contact', function (req, resp) {
    resp.send('This is the contact page');
});

app.listen(3000);
