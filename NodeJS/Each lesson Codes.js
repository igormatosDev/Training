// FIRST LESSON - Exporting modules
{
    // app.js
    {

        var stuff = require('./stuff');

        console.log(stuff.counter(['shaun', 'crystal', 'ryu']));
        console.log(stuff.adder(stuff.pi, 6));
        console.log(stuff.pi);
    }

    // stuff.js
    {
        module.exports.counter = function (arr) {
            return 'There are ' + arr.length + ' elements in this array';
        };


        module.exports.adder = function (a, b) {
            return `The sum of two numbers is ${a + b}`;
        };

        module.exports.pi = 3.142;
    }
}

// SECOND LESSON - Simulating and receiving Events
{
// app.js
    {

        var events = require('events');

        var myEmitter = new events.EventEmitter();

        myEmitter.on('someEvent', function (msg) {
            console.log(msg);
        });

        myEmitter.emit('someEvent', 'The event was emitter');

    }
}

// THIRD LESSON - Creating persons and an Event "speak" for any person
{
// app.js
    {
        var events = require('events');
        var util = require('util');
        var Person = function (name) {
            this.name = name;
        };

        util.inherits(Person, events.EventEmitter);

        var Lass = new Person('Lass');
        var Ryan = new Person('Ryan');
        var Ronan = new Person('Ronan');

        var people = [Lass, Ryan, Ronan];

        people.forEach(function (person) {
            person.on('speak', function (msg) {
                console.log(person.name + ' said: ' + msg);
            });
        });

        Lass.emit('speak', 'Hey dudes');
        Ryan.emit('speak', 'I\'d like a pizza!');
    }
}


/**
 NOTE: There's two kinds of readFile functions, the readFileSync and the readFile, and the first one is executed
 Sync and the second one by Async. The first one execute all code, while wait the file to be readed. The second one
 waits the file to finish the reading, and only then the rest of code is executed.
 */
//FOURTH LESSON - READING AND WRITING FILES
{
    //app.js
    {
        //Note: In this case, the console.log('test') happens first then console.log(true), because fs.readFile is in the Async mode.
        let fs = require('fs');
        fs.readFile('readme.txt', 'utf8', function (err, data) {
            fs.writeFile('writeMe.txt', data, function () {
                console.log(true);
            }); //That overwrite or create a file with the text of another one;
        });
        console.log('test');
    }
}

// FIFTH LESSON - CREATING AND REMOVING DIRECTORIES AND FILES
{
    //app.js
    {
        let fs = require('fs');
        fs.unlink('readme.txt'); //To delete a file
        fs.mkdirSync('stuff'); //To Create a Directory
        fs.rmdirSync('stuff'); //To Remove a Directory

        //Creates dir "stuff" and creates writeMe.txt inside it, with the value of readme.txt file
        fs.mkdir('stuff', function () {
            fs.readFile('readme.txt', 'utf8', function (err, data) {
                fs.writeFileSync('./stuff/writeMe.txt', data);
            })
        });

        //When u try to delete a dir with a file inside, the node doesn't allow it by default, then u need to
        //unlink the file and only then you'll be able to remove the path
        fs.unlink('./stuff/writeMe.txt', function () {
            fs.rmdir('stuff');
        });

    }
}


//SIXTH LESSON - STARTING A SERVER
{
    //app.js
    {
        let http = require('http');

        let server = http.createServer(function (request, response) {
            console.log('request was made: ' + request.url);
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('Hey!');
        });

        server.listen(3000, '127.0.0.1');
        console.log('Yo Dawgs, now listening to port 3000');
    }
}


//SEVENTH LESSON - READING A FILE CHUNK BY CHUNK, WITH STREAM AND BUFFERS
{
    //app.js
    {
        let http = require('http');
        let fs = require('fs');

        let myReadStream = fs.createReadStream(__dirname + '/readme.txt','utf8');
        let myWriteStream = fs.createWriteStream(__dirname + '/writeme.txt');

        //It does the same thing of
        myReadStream.on('data', function (chunk) {
            console.log('new chunk received:');
            myWriteStream.write(chunk)
        });
        //this vvv
        myReadStream.pipe(myWriteStream);
    }
}

//EIGHTH LESSON - SHOWING A HTML PAGE USING SERVER
{
    // app.js
    {
        let http = require('http');
        let fs = require('fs');


        let server = http.createServer(function (request, response) {
            console.log('request was made: ' + request.url);
            response.writeHead(200, {'Content-Type': 'text/html'});
            let myReadStream = fs.createReadStream(__dirname + '/index.html','utf8');
            myReadStream.pipe(response);
        });

        server.listen(3000, '127.0.0.1');
        console.log('Yo Dawgs, now listening to port 3000');
    }
}

// NINETH LESSON - SENDING JSON BACK TO PAGE USING SERVER
{
    //app.js
    {
        let http = require('http');
        let fs = require('fs');


        let server = http.createServer(function (request, response) {
            console.log('request was made: ' + request.url);
            response.writeHead(200, {'Content-Type': 'application/json'});
            let obj = {
                name:'Ryan',
                job:'Axe guy',
                age: 18
            };

            response.end(JSON.stringify(obj));
        });

        server.listen(3000, '127.0.0.1');
        console.log('Yo Dawgs, now listening to port 3000');
    }
}

// TENTH LESSON - BASIC ROUTING AT NODEJS
{
    // app.js
    {
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
    }
}

//NOTE: TO GENERATE THE "package.json" FILE, WE USE THE COMMAND "npm init" AND ANSWER THE QUESTIONS. THIS "package.json"
//FILE IS USED FOR REQUIRE ANOTHER PACKAGES BY CMD, BECAUSE SOME OF THESE PACKAGES REQUIRES THE "package.json" FILE. IF
//YOU USE "npm install {package} -save", THE NPM WILL INSTALL THE PACKAGE AS A DEPENDENCE.
