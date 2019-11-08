const getToken = require('jsonwebtoken');

exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        const info = getToken.verify(token, "123456");
        resolve(info);
    })
};
