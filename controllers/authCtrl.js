var sql = require('mssql')
var service = require('../services')
var config = require('../config');

var singIn = function (req, res) {
    var request = new sql.Request();
    console.log(req.body)
    console.log(req)
    request.input('user', sql.VarChar(50), req.body.user);
    request.input('pass', sql.BigInt, req.body.pass);
    request.output('status', sql.Int);
    request.execute('TEST_FILTROUSUARIOS', (err, result) => {
        if (err) {
            res.send(err);
        } else {
            
            if (result.output.status == 1) {
                res.status(200).send({
                    success: true,
                    message: 'Enjoy your token!',
                    token: service.createToken(req.body.user)
                });

            } else if (result.output.status == 2) {
                res.status(401).send({
                     'success': false,
                    'message': 'Authentication failed.'
                });
            } else {
                res.status(404).send({
                    'success': false,
                    'message': 'Authentication failed. User not found.'
                });
            }
        }
    });

}

var singUp = function (req, res) {

}

module.exports = {
    singIn,
    singUp
}