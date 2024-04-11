import {Router} from "express";
import PostsController from "../controllers/postsController";

const router = Router();

router.post("/add", PostsController.add)
router.delete("/delete/:id", PostsController.delete)
router.get('', PostsController.getAll)

export default router;