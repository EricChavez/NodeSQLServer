var sql = require('mssql')

var executeQuery = function (res, query) {
    var request = new sql.Request();
    request.query(query, function (err, rs) {
        if (err) {
            console.log('Error while querying database :- ' + err);
            res.send(err);
        } else {
            res.send(rs);
        }
    });
}
module.exports = executeQuery;