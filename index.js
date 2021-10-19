//Github Requirements
const github  = require('@actions/github');                     //Github Module
const context = github.context;                                 //Github contexts module(to get the payload and to post a comment)
const core = require('@actions/core');                          //Get Data from action.yml file
const myToken = core.getInput('myToken');                       //Personal github access token
const octokit = github.getOctokit(myToken);                     //provides access to the GitHub API


//Azure Cognitive Services Requirements:
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const endpoint = core.getInput('endpoint');
const key = core.getInput('key');
const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': key }
    }),
    endpoint);


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
            const desc = (await computerVisionClient.analyzeImage(link, {
                visualFeatures: ['Adult','Description']
            })).desc;
            console.log(JSON.stringify(desc));
            //console.log(adult)
            /*if (adult.isGoryContent || adult.isAdultContent) {
                const data = await octokit.issues.createComment({
                    owner: context.issue.owner,
                    repo: context.issue.repo,
                    issue_number: context.issue.number,
                    body: `Please delete this gory content @${context.actor}`,
                }).then(console.log("comment added "+context.issue.owner));
            }*/
        }
    }
}

commentIt().catch(core.setFailed);
