import { Request, Response } from "express";
import { ddb } from "../database";
import * as bcrypt from "bcrypt";
import { Converter } from "aws-sdk/clients/dynamodb";
import logger from "../logger";
import { createUserSchema } from "../models/UserSchema";

const tableName = process.env.DYNAMODB_TABLE;
const resetpassword = process.env.NEW_PASSWORD;

// get users from dynamoDB

export const getUsers = async (req: Request, res: Response) => {
  const params = {
    TableName: "Users",
  };
  try {
    const data = await ddb.scan(params, function (err, data) {
      if (err) {
        console.log("Error", err.code);
        logger.error("Error", err.code);
        res.json("Error get Users").status(500);
      } else {
        logger.info("getting users ...");
        console.log("Success", data.Items);
        // unhash passwords avoiding undefined

        res.json(data.Items).status(200);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

// get one user from dynamoDB

export const getUser = async (req: Request, res: Response) => {
  const params = {
    TableName: "Users",
    Key: {
      id: {
        S: String(req.params.id), //
      },
    },
  };
  try {
    const data = await ddb.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        logger.error("Error", err);
        res.json("Error get User").status(500);
      } else {
        console.log("One item : ", data);
        logger.info("getting user ...");
        res.json(data).status(200);
        return data;
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

// post user to dynamoDB

export const createUser = async (req: Request, res: Response) => {
  const { id, email, password, name } = req.body;
  const hashedPassword = await hashPassword(password);
  const { error, value } = createUserSchema.validate(email, password);
  if (error) {
    logger.error(error.details[0].message);
    res.json(error.details[0].message).status(500);
  }
  const params = {
    TableName: "Users",
    Item: {
      id: {
        S: String(id), //
      },
      name: {
        S: String(name), //
      },
      email: {
        S: String(email), //
      },
      password: {
        S: String(hashedPassword), //
      },
    },
  };
  try {
    const data = await ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        logger.error("Error", err);
        res.json("Error create User").status(500);
      } else {
        console.log("user created", data);
        logger.info("user created ...");
        res.send("user created").status(200);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

//get count of id from dynamoDB

export const getCount = async (req: Request, res: Response) => {
  const params = {
    TableName: "Users",
    Select: "COUNT",
  };
  try {
    const data = await ddb.scan(params, (err, data) => {
      if (err) {
        console.log("Error", err);
        logger.error("Error", err);
        res.json("Error get Count").status(500);
      } else {
        console.log("Count : ", data.ScannedCount);
        logger.info("getting count ...");
        res.json(data.Count).status(200);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

// get all id number (series) from dynamoDB

export const getSeries = async (req: Request, res: Response) => {
  const params = {
    TableName: "Users",
    ProjectionExpression: "id",
  };
  try {
    const data = await ddb.scan(params, function (err, data: any) {
      if (err) {
        console.log("Error", err);
        logger.error("Error", err);
        res.json("Error get Series").status(500);
      } else {
        console.log("Scanned :", data.Items);
        logger.info("getting series ...");
        // find the highegest id number
        let max = 0;
        for (let i = 0; i < data.Items.length; i++) {
          data.Items[i] = Converter.unmarshall(data.Items[i]);
          if (data.Items[i].id > max) {
            max = data.Items[i].id;
          }
        }
        res.json(max).status(200);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

// delete user from dynamoDB

export const deleteUser = async (req: Request, res: Response) => {
  const params = {
    TableName: "Users",
    Key: {
      id: {
        S: String(req.params.id), //
      },
    },
  };
  try {
    const data = await ddb.deleteItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        logger.error("Error", err);
        res.json("Error delete User").status(500);
      } else {
        console.log("Item deleted : ", data);
        logger.info("user deleted ...");
        res.json(data).status(200);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

// update user from dynamoDB

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, password, NewPassword } = req.body;
  const hashedNewPassword = await hashPassword(NewPassword);
  // get the user from dynamoDB
  const params1 = {
    TableName: "Users",
    Key: {
      id: {
        S: String(req.body.id),
      },
    },
  };
  try {
    const data = await ddb.getItem(params1, async function (err, data) {
      if (err) {
        console.log("Error", err);
        logger.error("Error", err);
        res.json({message:"Error get User"}).status(500);
      } else {
        console.log("Item : ", data);
        logger.info("user get ...");
        // check if the password is correct
        const validPassword = await bcrypt.compare(
          password,
          data.Item.password.S //possible undefined overload
        );
        if (!validPassword) {
          logger.error("Invalid Password");
          res.json({ message: "Invalid Password" }).status(500);
          return;
        } else {
          logger.info("password is valid ...");
          // update the user
          const params = {
            TableName: "Users",
            Key: {
              id: {
                S: String(req.body.id),
              },
            },
            UpdateExpression: "set email = :e, password = :p ",
            ExpressionAttributeValues: {
              ":e": {
                S: String(req.body.email),
              },
              ":p": {
                S: String(hashedNewPassword),
              },
            },
            ReturnValues: "UPDATED_NEW",
          };
          try {
            const data = await ddb.updateItem(params, function (err, data) {
              if (err) {
                console.log("Error", err);
                logger.error("Error", err);
                res.json({message:"Error update User"}).status(500);
              } else {
                console.log("Item updated : ", data);
                logger.info("user updated ...");
                res.json({data:data,message:"user updated"}).status(200);
              }
            });
          } catch (error) {
            console.log(error);
            logger.error(error);
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  const hashedNewPassword = await hashPassword(String(resetpassword));
  const params = {
    TableName: "Users",
    Key: {
      id: {
        S: String(req.body.id),
      },
    },
    UpdateExpression: "set email = :e, password = :p ",
    ExpressionAttributeValues: {
      ":e": {
        S: String(req.body.email),
      },
      ":p": {
        S: String(hashedNewPassword),
      },
    },
    ReturnValues: "UPDATED_NEW",
  };
  try {
    const data = await ddb.updateItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        logger.error("Error", err);
        res.json("Error update User").status(500);
      } else {
        console.log("Item updated : ", data);
        logger.info("user updated ...");
        res
          .json(data)
          .status(200)
          .send("password updated: " + resetpassword);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};
