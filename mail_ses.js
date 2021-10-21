const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: '<SES IAM user access key>',
    secretAccessKey: '<SES IAM user secret access key>',
    region: 'us-west-2',
};

var parameneters = {
    Source: '<email address you verified>',
    Destination: {
        ToAddresses: ['recipientEmail'],
    },

    ReplyToAddresses: ['<reply to email address>'],
    Message: {
        Body: {
            Html: {
            Charset: 'UTF-8',
            Data: 'This is the body of my email!',
            },
        },
        Subject: {
            Charset: 'UTF-8',
            Data: `Node JS Mail!`,
        }
    },
};

new AWS.SES(SES_CONFIG).sendEmail(parameneters).promise().then((res)=>{console.log(res)});