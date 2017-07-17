var mssql = require('mssql');
var dbConfig = {
    user: 'saB',
    password: "06011975",
    server: 'BLANCA-PC',
    database: 'SoftvNew'
};

var connection = mssql.connect(dbConfig, function (err) {
    if (err)
        console.log('Error while connecting database :- ' + err);
});

module.exports = connection;