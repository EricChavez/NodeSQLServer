var sql = require('mssql');
var service = require('../services');
var config = require('../config');

var singIn = function (req, res) {
    var request = new sql.Request();
    request.input('email', sql.VarChar(50), req.body.email);
    request.input('pass', sql.VarChar, req.body.pass);
    request.output('status', sql.Bit);
    request.execute('UserAuth', (err, result) => {
        if (err) res.send({message:err})
        if (result.output.status == true) {
            res.status(200).send({
                success: true,
                message: 'Enjoy your token!',
                token: service.createToken(req.body.email),
                user: req.body.email,
                menu: service.GetUserMenu(result.recordset)
            });
        } else {
            res.status(401).send({
                'success': false,
                'message': 'Error en la autenticación. no existe cuenta con los accesos proporcionados'
            });
        }
    });
}

var singUp = function (req, res) {


}


var recover = function (req, res) {
    var request = new sql.Request();
    request.input('email', sql.VarChar(50), req.body.email);
    request.output('existe', sql.Bit);
    request.execute('ValidateEmail', (err, result) => {
        if (err) res.status(500).send({
            message: err
        });
        if (result.output.existe == true) {
            const token = service.createToken(req.body.email);
            const text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://localhost:4200/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n';
            const subject = 'Recupera tu contraseña';
            res.status(200).send({
                message: service.SendEmail(req.body.email, subject, text)
            });


        } else {
            res.status(401).send({
                message: 'No existe una cuenta asignada al email proporcionado'
            });
        }
    });
};

validatetoken = function (req, res) {
    service.DecodeToken(req.body.token)
        .then(response => {
            res.status(200).send({
                message: 'El token es válido'
            });
        })
        .catch(response => {
            res.status(response.status).send({
                message: response.message
            });
        })
};


var reset = function (req, res) {

};



module.exports = {
    singIn,
    singUp,
    recover,
    reset,
    validatetoken
}