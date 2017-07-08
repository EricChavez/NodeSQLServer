var query = require('./query');

var get = function (req, res) {
    var sp = 'exec Softv_EncuestaGet';
    query(res, sp);
}

module.exports = {
    get
}