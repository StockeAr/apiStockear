import nodemailer=require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'proyecto.pp3@gmail.com', // generated ethereal user
      pass: 'exzmizzndrofzbzx', // generated ethereal password  //contraseña de aplicaciones: exzmizzndrofzbzx
    },
  });

  transporter.verify().then(()=>{
      console.log('Listo para enviar correos');
  })