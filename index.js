//Github Requirements
const github  = require('@actions/github');                     //Github Module
const core = require('@actions/core');
const context = github.context                                  //Github contexts module(to get the payload and to post a comment)
const myToken = core.getInput('myToken');                       //Personal github access token
const octokit = github.getOctokit(myToken)                      //provides access to the GitHub API
const core = require('@actions/core');                          //Get Data from action.yml file

//Azure Cognitive Services Requirements:
//


const getData = async() =>{
    

    let comment;
    if (context.payload.comment) {
        comment = context.payload.comment.body
    }
    else {
        comment = context.payload.issue.body
    }
        console.log("Actor: "+context.actor)
        console.log("Owner: "+context.issue.owner)
        const data = await octokit.issues.createComment({
            owner: context.issue.owner,
            repo: context.issue.repo,
            issue_number: context.issue.number,
            body: `Please delete this comment @${context.actor}`,
        }).then(console.log("comment added "+context.issue.owner));
}

getData();