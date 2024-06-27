import User from "../entities/user.entity";
import { Request, Response } from 'express';
import { check } from "express-validator";
import { isUniqueEmail } from "../validations/user.validations";
import { validate } from "./validator.controller";
import { makePassword } from "../utils/password";
import { dataSource } from "../utils/dataSource";
export default {
    createUser:{
        validations: [
            check('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
            check('email').isEmail().withMessage('Email must be valid').bail().custom(isUniqueEmail).withMessage('Email already registered'),
            check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
            validate
        ],
        handler: async (req: Request, res: Response): Promise<Response> => {
            try {
                const password = await makePassword(req.body.password);
                const model = dataSource.getRepository(User);

                const user = new User();
                user.email = req.body.email;
                user.name = req.body.name;
                user.password = password;

                await model.save(user);
                return res.json(user.toAPI());
            } catch (e) {
                return res.json({ msg: 'Error creating user' });
            }
    }
}
}