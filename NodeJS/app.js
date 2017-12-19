let http = require('http');
let fs = require('fs');


let server = http.createServer(function (request, response) {
    console.log('request was made: ' + request.url);
    if (request.url === '/home' || request.url === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(response);
    } else if (request.url === '/contact') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/contact.html').pipe(response);
    } else if (request.url === '/api/ninjas') {
        let ninjas = [
            {name: 'Lass', age: 23},
            {name: 'Senbonzakura', age: 33}
        ];
        response.writeHead(200, {'Content-Type': 'json/application'});
        response.end(JSON.stringify(ninjas));
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(response);
    }
});

server.listen(3000, '127.0.0.1');
console.log('Yo Dawgs, now listening to port 3000');