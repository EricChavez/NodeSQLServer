var query = require('../query');
var sql = require('mssql');

var GetRoleList = function (req, res) {
    var request = new sql.Request();    
    request.execute('GetRoleList', (err, result) => {
        if (err) {
            //console.log('Error while querying database :- ' + err);
            res.send(err);
        } else {
            res.send({result:result.recordset});
        }
    });
};

module.exports = {
    GetRoleList
};