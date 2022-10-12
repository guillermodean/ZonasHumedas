import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Load environment variables from .env file
class dynamoDb {
  public dynamoDb: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}

export { dynamoDb };

// Language: typescript
