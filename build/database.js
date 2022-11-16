"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddb = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set the Region
aws_sdk_1.default.config.update({ region: "eu-west-3" });
// Create DynamoDB service object
exports.ddb = new aws_sdk_1.default.DynamoDB({ apiVersion: "2012-08-10" });
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
