var query = require('./query');
var sql = require('mssql')



var getfilter = function (search, res) {
    var request = new sql.Request();
    request.input('FILTER', sql.VarChar(50),search);
    request.execute('TEST_FILTROUSUARIOS', (err, result) => {
        if (err) {
            console.log('Error while querying database :- ' + err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

module.exports = {
  
    getfilter
}