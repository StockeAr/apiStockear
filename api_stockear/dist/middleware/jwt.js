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
    var userId = jwtPayload.userId, username = jwtPayload.username, negocioId = jwtPayload.negocioId;
    //const newtoken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '1h' });
    //res.setHeader('token', newtoken);
    if (negocioId != null) {
        next();
    }
    else {
        return res.status(400).json({ message: "No esta en ningun negocio, defina uno" });
    }
};
//# sourceMappingURL=jwt.js.map