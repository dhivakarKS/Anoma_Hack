//Github Requirements
const github  = require('@actions/github');                     //Github Module
const context = github.context                                  //Github contexts module(to get the payload and to post a comment)
const core = require('@actions/core');                          //Get Data from action.yml file
const myToken = core.getInput('myToken');                       //Personal github access token
const octokit = github.getOctokit(myToken)                      //provides access to the GitHub API

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
        const data = await octokit.issues.createComment({
            owner: context.issue.owner,
            repo: context.issue.repo,
            issue_number: context.issue.number,
            body: `This is a github action generated for you @${context.actor}`,
        }).then(console.log("comment added "+context.issue.owner));
}

getData();