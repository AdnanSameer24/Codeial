const nodeMailer = require('../config/nodemailer');


console.log('Inside comments mailer');

// this is another way of exporting a method
exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
       from: 'adnansameerazk24@gmail.com' ,
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}



// const nodeMailer = require('../config/nodemailer');



// //another way of exporting methods
// exports.newComment = (comment) => {
//     console.log('inside new comment mailer');

//     nodeMailer.transporter.sendMail({
//         from : 'adnansameer1724@gmail.com',
//         to : comment.user.email,
//         subject : 'New comment published',
//         html : '<h1>Your comment is now published</h1>'
//     }, (err, info) => {
//         if(err){
//             console.log('Error in publishing comment',err);
//             return;
//         }

//         console.log('Mail delivered', info);
//         return;
//     });
// }