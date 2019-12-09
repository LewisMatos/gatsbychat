/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authGatsbychat7c1033ebUserPoolId = process.env.AUTH_GATSBYCHAT7C1033EB_USERPOOLID
var apiGatsbychatGraphQLAPIIdOutput = process.env.API_GATSBYCHAT_GRAPHQLAPIIDOUTPUT
var apiGatsbychatGraphQLAPIEndpointOutput = process.env.API_GATSBYCHAT_GRAPHQLAPIENDPOINTOUTPUT
var storageChatKitName = process.env.STORAGE_CHATKIT_NAME
var storageChatKitArn = process.env.STORAGE_CHATKIT_ARN

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const Chatkit = require("@pusher/chatkit-server");


var app = express()

const chatkit = new Chatkit.default({
  instanceLocator: process.env.INSTANCE_LOCATER,
  key: process.env.KEY
})


// declare a new express app

app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});



/**********************
 * Example get method *
 **********************/

app.get('/items', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/items', function(req, res) {
    const { username } = req.body;
    chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => {
      console.log(`User created: ${username}`);
      res.sendStatus(201).json({success: 'post call succeed!', url: req.url, body: req.body});
    })
    .catch(err => {
      if (err.error === "services/chatkit/user_already_exists") {
        console.log(`User already exists: ${username}`);
        res.sendStatus(200).json(err);
      } else {
        res.status(err.status).json(err);
      }
    });
    // res.json({success: 'post call succeed!', url: req.url, body: req.body});
});

app.post('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/items', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
