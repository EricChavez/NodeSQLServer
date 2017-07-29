var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const api=require('./routes');

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization');
    next();
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',api);
module.exports=app;