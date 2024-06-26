import UserModel, { UserStatus } from "../entities/user.entity";
import { Request, Response } from "express";
import { QueryFailedError, getRepository } from "typeorm";
import { pass, validate } from "./validator.controller";
import { check } from "express-validator";
import { makePassword } from "../util/password";
import { isUniqueEmail } from "../validations/user.validations";

export default {
  createUser: {
    validations: [
      check("email").isEmail().withMessage("Expected to be an email").bail().custom(isUniqueEmail),
      check("password").isString().withMessage("Expected to be a string"),
      check("name").isString().withMessage("Expected to be a string"),
      validate,
    ],
    handler: async (req: Request, res: Response): Promise<Response> => {
      try {
        const password = await makePassword(req.body.password);
        const model = getRepository(UserModel);
        const user = new UserModel();

        user.email = req.body.email;
        user.name = req.body.name;
        user.password = password;

        await model.save(user);
        return res.json(user.toAPI());
      } catch (e) {
        console.log(e);
        return res.json({ msg: "Error creating user" });
      }
    },
  },
};
