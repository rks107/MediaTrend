const queue = require('../config/kue');

const resetMailer = require('../mailers/reset_password_mailer');

queue.process('emails', function(job, done){

//    console.log('Email worker is processing a job', job.data);

   resetMailer.resetPassword(job.data);
   done();
});