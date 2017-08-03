'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
var nodemailer = require('nodemailer');


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

function SendEmail(to, subject, text) {
    const sent = new Promise((resolve, reject) => {
        try {

            var transporter = nodemailer.createTransport({
                service: config.email_service,
                auth: {
                    user: config.email_account,
                    pass: config.email_pass
                }
            });
            var mailOptions = {
                from: config.email_account,
                to: to,
                subject: subject,
                text: text
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject({
                        message: error
                    });
                } else {
                    resolve({
                        message: 'Email sent: ' + info.response
                    });
                }
            });
        } catch (err) {
            reject({
                message: err
            });
        }
    });

}

function DecodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.secret);
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
            resolve(payload);
        } catch (err) {
            reject({
                status: 403,
                message: 'El token no es válido'
            })
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    DecodeToken,
    GetUserMenu,
    SendEmail
};