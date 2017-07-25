

const app=require('./app');
var mssql = require('mssql');
const config=require('./config');

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization');
    next();
});

var dbConfig = {
    user: config.db_user,
    password: config.db_pass,
    server: config.db_server,
    database: config.db_database
};

var connection = mssql.connect(dbConfig, function (err) {
    if (err)
        console.log('Error while connecting database :- ' + err);
});

var server = app.listen(config.port, function () {
    var port = server.address().port;
    console.log('App now running on port', port);
});

