'use strict'

const service = require('../services');


function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'No tienes autorizacíon'
        });
    }

    const token = req.headers.authorization.split(" ")[1]
    service.DecodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })


}

module.exports = {
    isAuth
}