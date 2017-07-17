'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }
   return jwt.encode(payload,config.secret)
}

module.exports = {createToken};