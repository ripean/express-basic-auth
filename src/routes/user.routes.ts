import { Router } from 'express';
import user from '../controllers/user.controller'
const router = Router();
export default router;
router.get("/users", user.getUser.handler)