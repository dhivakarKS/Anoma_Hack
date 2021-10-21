//Github Requirements
const github  = require('@actions/github');                     //Github Module
const context = github.context;                                 //Github contexts module(to get the payload and to post a comment)
const core = require('@actions/core');                          //Get Data from action.yml file
const myToken = core.getInput('myToken');                       //Personal github access token
const octokit = github.getOctokit(myToken);                     //provides access to the GitHub API


//Azure Cognitive Services Requirements
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const endpoint = core.getInput('endpoint');
const key = core.getInput('key');
const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': key }
    }),
    endpoint);

//Email Requirements
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'email-smtp.us-west-2.amazonaws.com',
  port:'465',
  auth: {
    user: 'AKIAXQHQH2ZQAVVD4DEZ',
    pass: 'BDn/Fu4lIaGlOlOG/YfFhoiElSzObgImZKTcOcJPil/A'
  }
});

//Main Code
const commentIt = async() =>{
    let re = /https.*\.(jpeg|jpg|jpg|png|gif|bmp)/gm
    let comment;
    if (context.payload.comment) {
        comment = context.payload.comment.body
    }
    else {
        comment = context.payload.issue.body
    }
    if (re.test(comment)) {
        let links = comment.match(re)
        for (link of links) {
            console.log(link);

            const adult = (await computerVisionClient.analyzeImage(link, {
                visualFeatures: ['Adult']
            })).adult;
            console.log(adult.adultscore)

            if (adult.adultScore + 0.6 >= 0.6) {
                const data = await octokit.issues.createComment({
                    owner: context.issue.owner,
                    repo: context.issue.repo,
                    issue_number: context.issue.number,
                    body: `Please delete this gory content @${context.actor}`,
                }).then(console.log("comment added "+context.issue.owner));

                var mailOptions = {
                    from: 'dharanesh_k@trimble.com',
                    to: 'dharanesh_k@trimble.com',
                    subject: 'Cntent Moderator Generated mail from Github',
                    html: `<p>This email was sent because the uploaded image in an open issue comment in the repo <b>${context.issue.repo}</b> by <b>${context.actor}</b> was predicted <b>inappropriate</b> <br>Adult Score: ${adult.adultScore + 0.6}</p>`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }
        }
    }
}

commentIt().catch(core.setFailed);