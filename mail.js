var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dharun.k12899@gmail.com',
    pass: 'ptjicuglrmwnfiem'
  }
});

var mailOptions = {
  from: 'dharun.k12899@gmail.com',
  to: 'ajithakalai99@gmail.com,dharun.k12899@gmail.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>That was easy!</h1>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});