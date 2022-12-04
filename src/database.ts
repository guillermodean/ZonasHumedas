import AWS from "aws-sdk";
import dotenv from "dotenv";


dotenv.config();


// Set the Region
AWS.config.update({region: "eu-west-3"});
// Create DynamoDB service object
export var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
