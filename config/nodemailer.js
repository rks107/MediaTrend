const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { realpath } = require('fs');


let transpoter = nodemailer.createTransport({
   service: 'gmail',
    host: 'smtp.gmail.com',
    port:578,
    secure: false,
    auth: {
       user: 'developer.rks107',
       pass: 'Rohit@107'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTMl ;
    ejs.renderFile(
       path.join(__dirname, '../views/mailers', relativePath),
       data,
      function(err, template) {
           if(err) {console.log('error in rendering templates', err); return;}

           mailHTMl = template;
      }
    )

    return mailHTMl;
}

module.exports = {
    transpoter:transpoter,
    renderTemplate: renderTemplate
}