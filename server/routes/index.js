import {Router} from 'express'
import AuthController from "../controllers/authController";
const router = new Router();

router.post('/signIn', AuthController.signIn)
router.post('/signUp', AuthController.signUp)
router.post('/logout', AuthController.logout)
router.post('/refresh', AuthController.refresh)