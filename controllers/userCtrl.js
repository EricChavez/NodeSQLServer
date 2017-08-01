var query = require('../query');
var sql = require('mssql');

var emailvalidation = function (req, res) {
   
    var request = new sql.Request();
    request.input('email', sql.VarChar(50), req.body.email);
     request.output('existe', sql.Bit);
    request.execute('ValidateEmail', (err, result) => {
        if (err) {
            console.log('Error while querying database :- ' + err);
            res.send(err);
        } else {
            res.send({existe:result.output.existe});
        }
    });
};

module.exports = {  
    emailvalidation
};