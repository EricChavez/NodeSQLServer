var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const api=require('./routes')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',api)

module.exports=app