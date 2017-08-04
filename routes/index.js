'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const api = express.Router()
const path = require('path')

var userCtrl = require('../controllers/userCtrl');
var authCtrl = require('../controllers/authCtrl');
var roleCtrl = require('../controllers/RoleCtrl')


api.post('/authenticate', authCtrl.singIn);
api.post('/validate-token', authCtrl.validatetoken);
api.post('/singup', authCtrl.singUp);
api.post('/recover', authCtrl.recover);
api.post('/reset', authCtrl.reset);
api.post('/email-validation', auth.isAuth, userCtrl.emailvalidation);
api.get('/private', auth.isAuth, authCtrl.singUp);
api.get('/role/GetRoleList', auth.isAuth, roleCtrl.GetRoleList);
api.post('/user/CreateUser', auth.isAuth, userCtrl.CreateUser);

api.get('/image-not-found', function (req, res) {
    res.sendFile(path.resolve('./files/account/not-available.png'));
});


module.exports = api