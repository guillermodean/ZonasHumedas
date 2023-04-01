import AWS from "aws-sdk";




// Set the Region
AWS.config.update({region: "eu-west-3",
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// Create DynamoDB service object
export var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
