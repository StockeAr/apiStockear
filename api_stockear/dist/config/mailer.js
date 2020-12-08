"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'proyecto.pp3@gmail.com',
        pass: 'exzmizzndrofzbzx',
    },
});
exports.transporter.verify().then(function () {
    console.log('Listo para enviar correos');
});
//# sourceMappingURL=mailer.js.map