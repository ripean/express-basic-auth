import { Router } from "express";
import users from "./user.routes";
import auth from "./auth.routes";

const router = Router();
export default router;

router.use(users);
router.use(auth);