import { Request, Response } from 'express';
import { validate } from './validator.controller';
import { check } from 'express-validator';
import { authorize } from '../validations/auth';
import jwt from 'jsonwebtoken';
import User from '../entities/user.entity';
import env from '../utils/env';
import moment from 'moment';

export default {
    getToken: {
        validations: [
            check('email').isEmail().withMessage('Email must be valid'),
            check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
            validate,
            authorize
        ],
        handler: async (req: Request, res: Response): Promise<Response> => {
            const user = req.user as User;
            console.log(user)
            const payload = {
                id: user.id,
                role: user.role,
                exp: moment().add(1, 'week').unix()
            };
            const access_token = jwt.sign(payload, env.app.jwtSecret);

            const response = { 
                id: user.id,
                email: user.email,
                role: user.role,
                exp: payload.exp,
                access_token
            }
            return res.json(response)
            }
        }
    }
