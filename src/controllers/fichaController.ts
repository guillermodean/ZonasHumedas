import { Request, Response } from "express";
import { ddb } from "../database";
import * as fichas from "../../.Documentacion/ZHNC.json";
import jwt from "jsonwebtoken";
import { Converter } from "aws-sdk/clients/dynamodb";

const tableName = process.env.DYNAMODB_TABLE;
const secretKey = process.env.JWT_SECRET;

// get items from dynamoDB

export const getItems = async (req: Request, res: Response) => {
  console.log("getting items ...");
  const params = {
    TableName: "HumedalesNav",
  };
  try {
    const data = await ddb.scan(params, function (err, data: any) {
      if (err) {
        console.log("Error", err.code);
      } else {
        // iterate through data.Items and unmarshall each item
        for (let i = 0; i < data.Items.length; i++) {
          data.Items[i] = Converter.unmarshall(data.Items[i]);
        }
        //console.log("Scanned :", data.Items);
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
    TableName: "HumedalesNav",
    Key: {
      Serie: {
        S: String(req.params.id), //
      },
    },
  };
  // console.log(params);
  try {
    const data = await ddb.getItem(params, function (err, data: any) {
      if (err) {
        console.log("Error", err);
      } else {
        const convertedData = Converter.unmarshall(data.Item);
        //console.log("Item  : ", convertedData);
        console.log("getting item ...");
        res.json(convertedData);
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
    TableName: "HumedalesNav",
    Item: {
      ACUNID_antiguo: {
        S: req.body.index,
      },
      Enlace: {
        S: req.body.name,
      },
      Descripcion: {
        S: req.body.description,
      },
      Concatenacion: {
        S: req.body.image,
      },
      Paraje: {
        S: req.body.coordinates,
      },
      Municipio: {
        S: req.body.type,
      },
      Serie: {
        S: req.body.serie,
      },
      Fauna: {
        S: req.body.fauna,
      },
      Flora: {
        S: req.body.flora,
      },
      Geologia: {
        S: req.body.geologia,
      },
      Enlace_ebird: {
        S: req.body.enlace_ebird,
      },
      X: {
        S: req.body.x,
      },
      Y: {
        S: req.body.y,
      },
      Status_de_conservacion: {
        S: req.body.status_de_conservacion,
      },
      Recomendacion: {
        S: req.body.recomendacion,
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
    TableName: "HumedalesNav",
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
  console.log("entrando a updateItem ...");
  let {    Acunid_antiguo,Enlace,Descripcion,Concatenacion,Paraje, Municipio, Serie, Fauna, Flora, Geologia, Enlace_ebird, X, Y, Status_de_conservacion, Recomendacion
  } = req.body;
  //add al constants to an array
  const fields = [
    Acunid_antiguo,Enlace,Descripcion,Concatenacion,Paraje,Municipio,Serie,Fauna,Flora,Geologia,Enlace_ebird,X,Y,Status_de_conservacion,Recomendacion];
  //check if any of the constants is undefined and replace it with an empty string
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] === undefined) {
      fields[i] = "";
    }
  }
  //destructure the array
  [
    Acunid_antiguo,Enlace,Descripcion,Concatenacion,Paraje,Municipio,Serie,Fauna,Flora,Geologia,Enlace_ebird,X,Y,Status_de_conservacion,Recomendacion
  ] = fields;

  const params = {
    TableName: "HumedalesNav",
    Key: {
      Serie: {
        S: req.params.id,
      },
    },
    UpdateExpression:
      "SET #n = :n, #p = :p, #des = :des, #co = :co, #t = :t, #m = :m, #fa = :fa, #fo = :fo, #ge = :ge, #en = :en, #x = :x, #y = :y, #sc = :sc, #r = :r",
    ExpressionAttributeNames: {
      "#n": "Acunid_antiguo",
      "#p": "Enlace",
      "#des": "Descripcion",
      "#co": "Concatenacion",
      "#t": "Paraje",
      "#m": "Municipio",
      "#fa": "Fauna",
      "#fo": "Flora",
      "#ge": "Geologia",
      "#en": "Enlace_ebird",
      "#x": "X",
      "#y": "Y",
      "#sc": "Status_de_conservacion",
      "#r": "Recomendacion",
    },
    ExpressionAttributeValues: {
      ":n": { S: Acunid_antiguo },
      ":p": { S: Enlace },
      ":des": { S: Descripcion },
      ":co": { S: Concatenacion },
      ":t": { S: Paraje },
      ":m": { S: Municipio },
      ":fa": { S: Fauna },
      ":fo": { S: Flora },
      ":ge": { S: Geologia },
      ":en": { S: Enlace_ebird },
      ":x": { S: X },
      ":y": { S: Y },
      ":sc": { S: Status_de_conservacion },
      ":r": { S: Recomendacion },
    },
    ReturnValues: "UPDATED_NEW",
  };
  await ddb.updateItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.status(500).json({ error: "Could not update item" });
    } else {
      console.log('entrando a updateItem ...')
      console.log('req.headers.authorization: ', req.headers)
      const auth_header = req.headers.authorization;
      if (auth_header) {
        const token = auth_header.split(" ")[1];
        console.log('token: ', token)
        // verify token
        jwt.verify(token, String(secretKey), (err, user) => {
          if (err) {
            console.log('err: ', err);
            return res.sendStatus(403).json({ error: "Could not update item" });
          } else {
            console.log("Success", data);
            res.status(200).json({ message: "Item updated" });
          }
        });
      }
      else {
        console.log(auth_header)
      }
    }
  });
};
