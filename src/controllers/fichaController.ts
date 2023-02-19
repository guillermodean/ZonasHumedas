import { Request, Response } from "express";
import { ddb } from "../database";
import * as fichas from "../../.Documentacion/ZHNC.json";
import jwt from "jsonwebtoken";

const tableName = process.env.DYNAMODB_TABLE;
const secretKey = process.env.JWT_SECRET;

// get items from dynamoDB

export const getItems = async (req: Request, res: Response) => {
  console.log("entrando a lo GETITEMS");
  const params = {
    TableName: "Humedales",
  };
  try {
    const data = await ddb.scan(params, function (err, data) {
      if (err) {
        console.log("Error", err.code);
      } else {
        console.log("Scanned :", data.Items);
        // var dataunmarshalled = unmarshall(data.Items);
        res.json(data.Items);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get one item from dynamoDB

export const getItem = async (req: Request, res: Response) => {
  const params = {
    TableName: "Humedales",
    Key: {
      Serie: {
        S: String(req.params.id), //
      },
    },
  };
  console.log(params);
  try {
    const data = await ddb.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Item  : ", data.Item);
        res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// post item to dynamoDB

export const postItem = async (req: Request, res: Response) => {
  console.log("entrando a postItem");
  const params = {
    TableName: "Humedales",
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
  await ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.status(500).json({ error: "Could not create item" });
    } else {
      const auth_header = req.headers.authorization;
      if (auth_header) {
        const token = auth_header.split(" ")[1];
        // verify token
        jwt.verify(token, String(secretKey), (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          console.log("Success", data);
          res.status(200).json({ message: "Item created" });
        });
      }
    }
  });
};

// delete item from dynamoDB

export const deleteItem = async (req: Request, res: Response) => {
  console.log("entrando a deleteItem");
  const params = {
    TableName: "Humedales",
    Key: {
      Index: {
        S: req.params.id,
      },
    },
  };
  await ddb.deleteItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.status(500).json({ error: "Could not delete item" });
    } else {
      const auth_header = req.headers.authorization;
      if (auth_header) {
        const token = auth_header.split(" ")[1];
        // verify token
        jwt.verify(token, String(secretKey), (err, user) => {
          if (err) {
            return res.sendStatus(403);
          } else {
            console.log("Success", data);
            res.status(200).json({ message: "Item deleted" });
          }
        });
      }
    }
  });
};

// update item from dynamoDB

export const updateItem = async (req: Request, res: Response) => {
  console.log("entrando a updateItem");
  const params = {
    TableName: "Humedales",
    Key: {
      Index: {
        S: req.params.id,
      },
    },
    UpdateExpression:
      "set Name = :n, Description = :d, Image = :i, Coordinates = :c, Type = :t",
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
  await ddb.updateItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.status(500).json({ error: "Could not update item" });
    } else {
      const auth_header = req.headers.authorization;
      if (auth_header) {
        const token = auth_header.split(" ")[1];
        // verify token
        jwt.verify(token, String(secretKey), (err, user) => {
          if (err) {
            return res.sendStatus(403);
          } else {
            console.log("Success", data);
            res.status(200).json({ message: "Item updated" });
          }
        });
      }
    }
  });
};

// this function is to post all the items from the json file to dynamoDB but not used
export const postallItems = async (req: Request, res: Response) => {
  console.log(fichas);
  // map json file and post one by one to dynamoDB
  let n = 0;
  fichas.forEach((element) => {
    console.log(n);
    const params = {
      TableName: "Humedales", // me quede aqui, tengo que hacer un for each para recorrer el json y hacer un post por cada elemento
      Item: {
        Index: {
          S: String(element.Serie),
        },
        ACUNID_antiguo: {
          S: element["ACUNID antiguo"],
        },
        Cod_antiguo: {
          S: element["Cod antiguo"],
        },
        Cod_adic: {
          S: element["Cod adic"],
        },
        Municipio: {
          S: element.Municipio,
        },
        Paraje: {
          S: element.Paraje,
        },
        Rio: {
          S: element.Río,
        },
        Concatenacion: {
          S: element["Concatenación 2"],
        },
        CoordenadaXUTC: {
          S: String(element.X),
        },
        CoordenadaYUTC: {
          S: String(element.Y),
        },
      },
    };

    ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error fatal", err);
      } else {
        console.log("Success", data);
      }
    });
    n = n + 1;
  });
};
