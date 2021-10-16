//Github Requirements
const github  = require('@actions/github');                     //Github Module
const context = github.context                                  //Github contexts module(to get the payload and to post a comment)
const myToken = "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";     //Personal github access token
const octokit = github.getOctokit(myToken)                      //provides access to the GitHub API

//Azure Cognitive Services Requirements:
//

const owner = 'dharanesh12899',repo = 'Admin';

const getData = async() =>{


    const addcomment = await octokit.issues.createComment({
        owner: owner,
        issue_number: 1,
        repo: repo,
        body: `This is a test comment for issue 1 @${owner}`,
    }).then(console.log("comment added "));
}

getData();