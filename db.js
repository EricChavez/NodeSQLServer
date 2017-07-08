var mssql = require('mssql');
var dbConfig = {
    user: 'saB',
    password: "06011975",
    server: '192.168.50.25',
    database: 'SoftvNew'
};

var connection = mssql.connect(dbConfig, function (err) {
    if (err)
        console.log('Error while connecting database :- ' + err);
});

module.exports = connection;