import {Request,Response} from 'express';
import { ddb } from '../database';

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
        console.log("Scanned :", data.Items);
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

// post user to dynamoDB

export const createUser = async (req: Request, res: Response) => {
    const params = {
        TableName: "Users",
        Item: {
            id: {
                S: String(req.body.id) //   
            },
            name: {
                S: String(req.body.name) //
            },
            email: {
                S: String(req.body.email) //
            },
            password: {
                S: String(req.body.password) //
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
                S: String(req.body.id) //
            },
        },
        UpdateExpression: "set name = :n, email = :e, password = :p",
        ExpressionAttributeValues: {
            ":n": {
                S: String(req.body.name) //
            },
            ":e": {
                S: String(req.body.email) //
            },
            ":p": {
                S: String(req.body.password) //
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