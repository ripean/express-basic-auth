import { Router } from "express";
import auth from "../controllers/auth.controller";
const router = Router();
export default router;

router.post('/authenticate', auth.getToken.validations, auth.getToken.handler);