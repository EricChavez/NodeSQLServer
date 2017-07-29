var sql = require('mssql')
var service = require('../services')
var config = require('../config');

var singIn = function (req, res) {
    var request = new sql.Request();
    request.input('email', sql.VarChar(50), req.body.email);
    request.input('pass', sql.VarChar, req.body.pass);
    request.output('status', sql.Bit);
    request.execute('UserAuth', (err, result) => {
        if (err) res.send(err)
        if (result.output.status == true) {
            res.status(200).send({
                success: true,
                message: 'Enjoy your token!',
                token: service.createToken(req.body.user)
            });
        } else {
            res.status(401).send({
                'success': false,
                'message': 'Authentication failed.'
            });
        }
    });
}

var singUp = function (req, res) {

}

module.exports = {
    singIn,
    singUp
}