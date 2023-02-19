import {Request,Response} from 'express';
import { ddb } from '../database';
import * as bcrypt  from 'bcrypt';
import * as jwt from 'jsonwebtoken';


const tableName = process.env.DYNAMODB_TABLE;
// key for jwt from .env
const config = {
    secret: process.env.JWT_SECRET
};
console.log(config.secret)

// get one user form dynamodb by his email




//user login

export const login = async (req:Request, res:Response) => {
    const {id,email,password,name} = req.body

    const params = {
        TableName: 'Users',
        FilterExpression: '#email = :email',
        ExpressionAttributeNames: {
            '#email': 'email'
        },
        ExpressionAttributeValues: {
          ":email":{"S":email}
        }
    };
    try {
        const data = await ddb.scan(params, function (err, data) {
            // check if user exists
            if (err) {
                console.log("Error", err);
                res.json("Error get User").status(500);
            } else {
                console.log("One item : ", data.Items);
                const user = data.Items;
                // check if password is correct
                console.log("aqui llega");
                if (user && bcrypt.compareSync(password, String(user[0].password.S))) {
                    console.log("password correct");
                    //generate token

                    const token = jwt.sign({ sub: user[0].id }, String(config.secret) || "9!!p9FC8h^$3mT", { expiresIn: '7d' });

                    // authentication successful
                    res.status(200).json({
                        token,user
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