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
    return jwt.encode(payload, config.secret)
}


function DecodeToken(token) {
    const decoded = new Promise((resolve, reject) => {

        try {
            const payload = jwt.decode(token, config.secret)
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
        } catch (err) {
            reject({
                status: 500,
                message: 'El token ha expirado'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,DecodeToken
};