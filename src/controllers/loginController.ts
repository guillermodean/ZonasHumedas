import {Request,Response} from 'express';
import { ddb } from '../database';
import * as bcrypt  from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import logger from '../logger';
import { createUserSchema } from '../models/UserSchema';


const tableName = process.env.DYNAMODB_TABLE;
// key for jwt from .env
const config = {
    secret: process.env.JWT_SECRET
};
// get one user form dynamodb by his email
//user login

export const login = async (req:Request, res:Response) => {
    const {id,email,password,name} = req.body

    // validate user input
    const { error, value } = createUserSchema.validate(email,password);
    if (error) {
        logger.error(error.details[0].message );
        res.json(error.details[0].message ).status(500);
    }
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
                logger.error("Error", err);
                res.json("Error get User").status(500);
            } else {
                
                
                const user = data.Items;
                // check if user exists by checking if user is [] or not
                if (user == undefined || user.length == 0) { 
                    console.log("user not found", user);
                    logger.error("user not found", user);
                    res.status(400).json({ message: 'User not found' });
                }else{
                // check if password is correct
                    console.log("checking password ...");
                    logger.info("checking password ...");
                    if (user && bcrypt.compareSync(password, String(user[0].password.S))) { // compare password with hash
                        console.log("password correct");
                        logger.info("password correct");
                        //generate token

                        const token = jwt.sign({ sub: user[0].id }, String(config.secret) || "9!!p9FC8h^$3mT", { expiresIn: '7d' });

                        // authentication successful
                        res.status(200).json({
                            token,user
                        });
                    } else {
                        // authentication failed
                        logger.error("password or email incorrect");
                        res.status(400).json({ message: 'Email or password is incorrect' });
                    }
                }
            }
        });

    } catch (error) {
        console.log(error);
        logger.error(error);
    }

    
}