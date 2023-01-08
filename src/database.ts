import AWS from "aws-sdk";
import dotenv from "dotenv";

// Load .env file contents into process.env. 
dotenv.config();

const region = process.env.AWS_REGION;

console.log("region", region);

// Set the Region
AWS.config.update({region: "eu-west-3"});
// Create DynamoDB service object
export var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
