const nodeMailer = require('../config/nodemailer');

exports.resetPassword = (user) => {
   console.log('inside reset password mailer', user);
   let htmlString = nodeMailer.renderTemplate({user:user}, '/password/reset_password.ejs');

   nodeMailer.transpoter.sendMail({
       from: 'developer.rks107@gmail.com',
       to: user.email,
       subject: 'Password for mediaTrend',
       html: htmlString
   }, (err, info) => {
        if(err){console.log('Error in sending mail', err); return;}
  
        console.log('message sent', info);
        return;
   });
 
}