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

function GetUserMenu(ModuleSet) {
   // console.log(ModuleSet);
    const Modules = new Array();
    ModuleSet.forEach(function (item) {
        console.log(item.ModuleId);
        if (item.ParentId == 0) {
            item.children = [];
            ModuleSet.forEach(function (children) {
                console.log(children);
                if (children.ParentId == item.ModuleId) item.children.push(children);
            });
          Modules.push(item);
        }
    });
return Modules;

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
    return decoded;
}

module.exports = {
    createToken,
    DecodeToken,
    GetUserMenu
};