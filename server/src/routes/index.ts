import {Router} from "express";
import authRouter from "./authRouter"
import postsRouter from "./postsRouter"

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postsRouter);

export default router;

