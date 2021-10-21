var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'email-smtp.us-west-2.amazonaws.com',
  port:'465',
  auth: {
    user: 'AKIAXQHQH2ZQAVVD4DEZ',
    pass: 'BDn/Fu4lIaGlOlOG/YfFhoiElSzObgImZKTcOcJPil/A'
  }
});

var mailOptions = {
  from: 'dharanesh_k@trimble.com',
  to: '',
  subject: 'Sending Email using Node.js',
  html: '<h6>The Predicted Adult Score is: </h6>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});