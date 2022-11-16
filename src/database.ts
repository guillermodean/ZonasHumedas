import AWS from "aws-sdk";
import dotenv from "dotenv";


dotenv.config();


// Set the Region
AWS.config.update({region: "eu-west-3"});
// Create DynamoDB service object
export var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

// Call DynamoDB to retrieve the list of tables
// ddb.listTables({Limit:10}, function(err, data) {
//   if (err) {
//     console.log("Error", err.code);
//   } else {
//     console.log("Tables names are ", data.TableNames);
//   }
// });
// // const tableName = process.env.DYNAMODB_TABLE;
// ddb.scan({
//     TableName: "Humedales_Nav"

// }, function(err, data) {
//     if (err) {
//         console.log("Error", err.code);
//     } else {
//         console.log("Scan :", data.Items);
//     }
// });

// ddb.getItem({
//     TableName: "Humedales_Nav",
//     Key: {
//         "Index": {
//             S: "001"
//         }
//     }
// }, function(err, data) {

//     if (err) {
//         console.log("Error", err.code);
//     } else {
//         console.log("Item  : ", data.Item);
//     }
// });

// Language: typescript
