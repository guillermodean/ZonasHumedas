import {Request,Response} from 'express';
import { ddb } from '../database';
import * as bcrypt  from 'bcrypt';
import { Converter } from 'aws-sdk/clients/dynamodb';

const tableName = process.env.DYNAMODB_TABLE;


// get users from dynamoDB

export const getUsers = async (req: Request, res: Response) => {
  const params = {
    TableName: "Users",
  };
  try {
    const data = await ddb.scan(params, function (err, data) {
      if (err) {
        console.log("Error", err.code)
        res.json("Error get Users").status(500);
      } else {
        //console.log("Scanned :", data.Items);
        res.json(data.Items).status(200);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// get one user from dynamoDB

export const getUser = async (req: Request, res: Response) => {
    const params = {
        TableName: "Users",
        Key: {
            id: {
                S: String(req.params.id) //
            },
        },
    };
    console.log(req.params.id)
    try {
        const data = await ddb.getItem(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                res.json("Error get User").status(500);
            } else {
                console.log("One item : ", data.Item);
                res.json(data).status(200);
            }
        });
    } catch (error) {
        console.log(error);
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
    
    const {id,email,password,name} = req.body
    const hashedPassword = await hashPassword(password);

    const params = {
        TableName: "Users",
        Item: {
            id: {
                S: String(id) //   
            },
            name: {
                S: String(name) //
            },
            email: {
                S: String(email) //
            },
            password: {
                S: String(hashedPassword) //
            },
        },
    };
    try {
        const data = await ddb.putItem(params, function (err, data) {
            if (err) {
                console.log("Error", err)
                res.json("Error create User").status(500);
            } else {
                res.send("user created").status(200);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//get count of id from dynamoDB

export const getCount = async (req: Request, res: Response) => {  
    const params = {
        TableName: "Users",
        Select: "COUNT",
    };
    try {
        const data = await ddb.scan(params,  (err, data) => {

            if (err) {
                console.log("Error", err);
                res.json("Error get Count").status(500);
            } else {
                console.log("Count : ", data.ScannedCount);
                res.json(data.Count).status(200);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// get all id number (series) from dynamoDB

export const getSeries = async (req: Request, res: Response) => {
    const params = {
        TableName: "Users",
        ProjectionExpression: "id",
    };
    try {
        const data = await ddb.scan(params, function (err, data:any) {
            if (err) {
                console.log("Error", err);
                res.json("Error get Series").status(500);
            } else {
                console.log("Scanned :", data.Items);
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
    }
}




// delete user from dynamoDB

export const deleteUser = async (req: Request, res: Response) => {
    const params = {
        TableName: "Users",
        Key: {
            id: {
                S: String(req.params.id) //
            },
        },
    };
    try {
        const data = await ddb.deleteItem(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                res.json("Error delete User").status(500);
            } else {
                console.log("Item deleted : ", data);
                res.json(data).status(200);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// update user from dynamoDB

export const updateUser = async (req: Request, res: Response) => {
    const params = {
        TableName: "Users",
        Key: {
            id: {
                S: String(req.body.id) 
            },
        },
        UpdateExpression: "set email = :e, password = :p ,  id = :i",
        ExpressionAttributeValues: {
            ":e": {
                S: String(req.body.email) 
            },
            ":p": {
                S: String(req.body.password) 
            },
        },
        ReturnValues: "UPDATED_NEW",
    };
    try {
        const data = await ddb.updateItem(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                res.json("Error update User").status(500);
            } else {
                console.log("Item updated : ", data);
                res.json(data).status(200);
            }
        });
    } catch (error) {
        console.log(error);
    }
}