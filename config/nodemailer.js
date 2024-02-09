// https://community.auth0.com/t/error-invalid-login-application-specific-password-required/113879


const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

console.log('Inside nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    logger: true,
    debug : true,
    secureConnection : false,
    auth: {
        user: 'adnansameerazk24@gmail.com',
        pass: 'fpxi rkmp ggzd lpxo'
    },
    tls : {
        rejectUnauthorized: true
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template'); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}



// const nodemailer = require('nodemailer');
// const ejs = require('ejs');
// const path = require('path');

// let transporter = nodemailer.createTransport({
//     service : 'gmail',
//     host : 'smtp.gmail.com',
//     port : 587,
//     secure : false,
//     auth : {
//         user : 'adnansameer1724',
//         pass : 'Abdveil@1724'
//     }
// });

// let renderTemplate = (data, relativePath) => {
//     let mailHTML ;
//         ejs.renderFile(
//             path.join(__dirname, '../views/mailers', relativePath),
//             data,
//             function(err, template){
//                 if(err){
//                     console.log('Error in rendering template',err);
//                     return;
//                 }

//                 mailHTML = template;
//             }

//         )

//         return mailHTML;
// }


// module.exports = {
//     transporter: transporter,
//     renderTemplate: renderTemplate
// };