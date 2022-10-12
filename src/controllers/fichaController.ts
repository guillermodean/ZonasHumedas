
import { Request, Response } from 'express';
import { dynamoDb } from "c:/Users/guill/Documents/13-Proyectos/Zonas Humedas/src/database";

const tableName = process.env.DYNAMODB_TABLE;

let DB = new dynamoDb().dynamoDb;
const prueba={"name":"guillermo","description":"1234"};
class FichaController {
    public async getFichas(req: Request, res: Response) {
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
    }
    public async getFicha(req: Request, res: Response) {
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
    }
    public async create(req: Request, res: Response) {
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
    }
    public async update(req: Request, res: Response) {
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
    }
    public async delete(req: Request, res: Response) {
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
    }

};

export const fichaController = new FichaController();
