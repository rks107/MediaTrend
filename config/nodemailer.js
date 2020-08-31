const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { realpath } = require('fs');
const env = require('./environment');

let transpoter = nodemailer.createTransport(env.smtp);

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