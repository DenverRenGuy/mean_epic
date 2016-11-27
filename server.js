// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();

//Server Variables
var totalCount = 0;
var setCount = 0;
var data = {};

// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})


// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

//Tell the socket var to listen to the server
var io = require('socket.io').listen(server);
//console.log(io);

//DO the following for all connections
io.sockets.on('connection', function(socket){
    console.log('Sockets Activated!');
    console.log(socket.id);
    socket.on('update_counter', function(){
        totalCount += 1;
        setCount += 1;
        data.totalCount = totalCount;
        data.setCount = setCount;
        console.log(data);
        io.emit('full_broadcast', data);
    })
    socket.on('reset_counter', function(){
        setCount = 0;
        data.setCount = setCount;
        io.emit('full_broadcast', data);
    })
    // socket.on('mean_form_submit', function(data){
    //     console.log('A form has been submitted by ' + data.name);
    //     data.luckyNumber = Math.round((Math.random()*10000000));
    //     socket.emit('mean_form_response', data);
    // });
})
