import { Request, Response } from "express";
import { validate } from "./validator.controller";
import { check } from "express-validator";
import { authorize } from "../validations/auth";
import jwt from "jsonwebtoken";
import User from "../entities/user.entity";
import env from "../util/env";
import moment from "moment";

export default {
  getToken: {
    validations: [
      check("email").isEmail().withMessage("Expected to be an email"),
      check("password").isString().withMessage("Expected to be a string"),
      validate,
      authorize,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      const user = req.user as User;
      console.log('here');
      console.log(user);
      const payload = {
        id: user.id,
        role: user.role,
        status: user.status,
        exp: moment().add(1, "week").unix()
      };

      const access_token = jwt.sign(payload, env.app.jwtSecret);

      const response = {
        id: user.id,
        email: user.email,
        exp: payload.exp,
        access_token,
      };

      return res.json(response);
    },
  },
};
