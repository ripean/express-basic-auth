import { Router } from "express";
import user from "../controllers/user.controller";
import { authenticate } from "../validations/auth";

const router = Router();

export default router;

router.post('/users', ...user.createUser.validations, user.createUser.handler);