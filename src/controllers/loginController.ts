import {Request,Response} from 'express';
import { ddb } from '../database';
import * as bcrypt  from 'bcrypt';


const tableName = process.env.DYNAMODB_TABLE;


//user login

export const login = async (req:Request, res:Response) => {
    const {email,password} = req.body

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
            // check if user exists
            if (err) {
                console.log("Error", err);
                res.json("Error get User").status(500);
            } else {
                console.log("One item : ", data.Item);
                const user = data.Item;
                // check if password is correct
                if (user && bcrypt.compareSync(password, String(user.password.S))) {
                    // authentication successful
                    res.status(200).json({
                        id: user.id.S,
                        email: user.email.S,
                        name: user.name.S,
                        password: user.password.S,
                    });
                } else {
                    // authentication failed
                    res.status(400).json({ message: 'Email or password is incorrect' });
                }

            }
        });

    } catch (error) {
        console.log(error);
    }

    
}