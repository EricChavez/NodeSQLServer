var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var user = require('./userCtrl');
var auth = require('./authCtrl');
var app = express();


app.use(bodyParser.json());
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization');
    next();
});

var server = app.listen(process.env.PORT || 50, function () {
    var port = server.address().port;
    console.log('App now running on port', port);
});

app.post('/api/authenticate', auth.singIn);
app.post('/api/singup', auth.singUp);