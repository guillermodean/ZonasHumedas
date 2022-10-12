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
exports.fichaController = void 0;
const database_1 = require("c:/Users/guill/Documents/13-Proyectos/Zonas Humedas/src/database");
const tableName = process.env.DYNAMODB_TABLE;
let DB = new database_1.dynamoDb().dynamoDb;
const prueba = { "name": "guillermo", "description": "1234" };
class FichaController {
    getFichas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: String(tableName),
            };
            DB.scan(params, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: "Could not load items" });
                }
                res.json(data.Items);
            });
        });
    }
    getFicha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: String(tableName),
                Key: {
                    id: req.params.id,
                },
            };
            DB.get(params, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: "Could not load items" });
                }
                res.json(data.Item);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: String(tableName),
                Item: {
                    Humedales_N: "001",
                    name: prueba.name,
                    description: prueba.description,
                },
            };
            DB.put(params, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: "Could not create item" });
                }
                res.json({ success: "Created successfully" });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: String(tableName),
                Key: {
                    id: req.params.id,
                },
                UpdateExpression: "set name = :n, description = :d",
                ExpressionAttributeValues: {
                    ":n": req.body.name,
                    ":d": req.body.description,
                },
                ReturnValues: "UPDATED_NEW",
            };
            DB.update(params, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: "Could not update item" });
                }
                res.json({ success: "Updated successfully" });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: String(tableName),
                Key: {
                    id: req.params.id,
                },
            };
            DB.delete(params, (err, data) => {
                if (err) {
                    res.status(500).json({ error: "Could not delete item" });
                }
                res.json({ success: "Deleted successfully" });
            });
        });
    }
}
;
exports.fichaController = new FichaController();
