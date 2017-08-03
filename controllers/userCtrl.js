var query = require('../query');
var sql = require('mssql');

var emailvalidation = function (req, res) {
    var request = new sql.Request();
    request.input('email', sql.VarChar(50), req.body.email);
    request.output('existe', sql.Bit);
    request.execute('ValidateEmail', (err, result) => {
        if (err) {
            //console.log('Error while querying database :- ' + err);
            res.send(err);
        } else {
            res.send({
                existe: result.output.existe
            });
        }
    });
};

var CreateUser = function (req, res) {

    var request = new sql.Request();
    request.input('UserName', sql.VarChar(50), req.body.UserName);
    request.input('Email', sql.VarChar(50), req.body.Email);
    request.input('RoleId', sql.Int, req.body.RoleId);
    request.input('Status', sql.Bit, req.body.Status);
    request.input('Password', sql.VarChar(50), req.body.Password);
    request.input('PhoneNumber', sql.VarChar(50), req.body.PhoneNumber);
    request.execute('CreateUser', (err, result) => {
        if (err) {
            //console.log('Error while querying database :- ' + err);
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).send({
                message: 'El usuario se ha creado correctamente'
            });
        }
    });


};

module.exports = {
    emailvalidation,
    CreateUser
};

//eACG28101993