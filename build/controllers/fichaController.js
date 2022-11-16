"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postItem = exports.getItems = void 0;
const database_1 = require("../database");
const tableName = process.env.DYNAMODB_TABLE;
// get items from dynamoDB
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entrando a getItems");
    const params = {
        TableName: "Humedales_Nav",
    };
    try {
        const data = yield database_1.ddb.scan(params, function (err, data) {
            if (err) {
                console.log("Error", err.code);
            }
            else {
                console.log("Scan :", data.Items);
                res.json(data);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getItems = getItems;
// post item to dynamoDB
const postItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entrando a postItem");
    const params = {
        TableName: "Humedales_Nav",
        Item: {
            Index: {
                S: req.body.index,
            },
            Name: {
                S: req.body.name,
            },
            Description: {
                S: req.body.description,
            },
            Image: {
                S: req.body.image,
            },
            Coordinates: {
                S: req.body.coordinates,
            },
            Type: {
                S: req.body.type,
            },
        },
    };
    yield database_1.ddb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.status(500).json({ error: "Could not create item" });
        }
        else {
            console.log("Success", data);
            res.status(200).json({ message: "Item created" });
        }
    });
});
exports.postItem = postItem;
