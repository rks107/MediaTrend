const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
   console.log('inside newComment mailer', comment);

   nodeMailer.transpoter.sendMail({
       from: 'developer.rks107@gmail.com',
       to: comment.user.email,
       subject: 'New Comment published',
       html: '<h1> Yup, your comment is published now!</>'
   }, (err, info) => {
        if(err){console.log('Error in sending mail', err); return;}
  
        console.log('message sent', info);
        return;
   });
 
}