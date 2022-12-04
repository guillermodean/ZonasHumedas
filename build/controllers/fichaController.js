"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.postallItems = exports.updateItem = exports.deleteItem = exports.postItem = exports.getItem = exports.getItems = void 0;
const database_1 = require("../database");
const fichas = __importStar(require("../../.Documentacion/ZHNC.json"));
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
// get one item from dynamoDB
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Humedales_Nav",
        Key: {
            Index: {
                S: req.params.id,
            },
        },
    };
    try {
        const data = yield database_1.ddb.getItem(params, function (err, data) {
            if (err) {
                console.log("Error", err.code);
            }
            else {
                console.log("Item  : ", data.Item);
                res.json(data);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getItem = getItem;
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
// delete item from dynamoDB
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entrando a deleteItem");
    const params = {
        TableName: "Humedales_Nav",
        Key: {
            Index: {
                S: req.params.id,
            },
        },
    };
    yield database_1.ddb.deleteItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.status(500).json({ error: "Could not delete item" });
        }
        else {
            console.log("Success", data);
            res.status(200).json({ message: "Item deleted" });
        }
    });
});
exports.deleteItem = deleteItem;
// update item from dynamoDB
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entrando a updateItem");
    const params = {
        TableName: "Humedales_Nav",
        Key: {
            Index: {
                S: req.params.id,
            },
        },
        UpdateExpression: "set Name = :n, Description = :d, Image = :i, Coordinates = :c, Type = :t",
        ExpressionAttributeValues: {
            ":n": {
                S: req.body.name,
            },
            ":d": {
                S: req.body.description,
            },
            ":i": {
                S: req.body.image,
            },
            ":c": {
                S: req.body.coordinates,
            },
            ":t": {
                S: req.body.type,
            },
        },
        ReturnValues: "UPDATED_NEW",
    };
    yield database_1.ddb.updateItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.status(500).json({ error: "Could not update item" });
        }
        else {
            console.log("Success", data);
            res.status(200).json({ message: "Item updated" });
        }
    });
});
exports.updateItem = updateItem;
const postallItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(fichas);
    // map json file and post one by one to dynamoDB
    fichas.forEach((element) => {
        const params = {
            TableName: "Humedales_Nav",
            Item: {
                Index: {
                    S: element.Index,
                },
                Name: {
                    S: element.Name,
                },
                Description: {
                    S: element.Description,
                },
                Image: {
                    S: element.Image,
                },
                Coordinates: {
                    S: element.Coordinates,
                },
                Type: {
                    S: element.Type,
                },
            },
        };
        database_1.ddb.putItem(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            }
            else {
                console.log("Success", data);
            }
        });
    });
});
exports.postallItems = postallItems;
