'use strict'

const express=require('express')
const auth=require('../middlewares/auth')
const api=express.Router()
var user = require('../controllers/userCtrl');
var authCtrl = require('../controllers/authCtrl');


api.post('/authenticate', authCtrl.singIn);
api.post('/singup', authCtrl.singUp);
api.get('/private',auth.isAuth, authCtrl.singUp);

module.exports=api
