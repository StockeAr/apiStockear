"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
exports.checkJwt = function (req, res, next) {
    //auth es el nombre que le asigno para pasa por parametro en esta variable el token de config.ts para validar en el postman
    var token = req.headers['auth'];
    var jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (e) {
        return res.status(401).json({ message: 'No esta autorizado' });
    }
    var userId = jwtPayload.userId, username = jwtPayload.username;
    var newtoken = jwt.sign({ userId: userId, username: username }, config_1.default.jwtSecret, { expiresIn: '1h' });
    res.setHeader('token', newtoken);
    next();
};
//# sourceMappingURL=jwt.js.map