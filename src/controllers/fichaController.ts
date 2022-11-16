import { Request, Response } from "express";
import { ddb } from "../database";

const tableName = process.env.DYNAMODB_TABLE;


// get items from dynamoDB


export const getItems =  async (req: Request, res: Response) => {
  console.log("entrando a getItems");
  const params = {
    TableName: "Humedales_Nav",
  };
  try {
     const data = await ddb.scan(params, function(err, data) {
      if (err) {
        console.log("Error", err.code);
      } else {
        console.log("Scan :", data.Items);
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
  await ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.status(500).json({ error: "Could not create item" });
    } else {
      console.log("Success", data);
      res.status(200).json({ message: "Item created" });
    }
  });
}


