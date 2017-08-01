'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const api = express.Router()
var userCtrl = require('../controllers/userCtrl');
var authCtrl = require('../controllers/authCtrl');


api.post('/authenticate', authCtrl.singIn);
api.post('/singup', authCtrl.singUp);
api.post('/email-validation',auth.isAuth, userCtrl.emailvalidation);
api.get('/private', auth.isAuth, authCtrl.singUp);

module.exports = api