import { Request, Response } from 'express';

class PostsController {
    static async add(req: Request, res: Response) {

    }

    static async getAll(req: Request, res: Response) {
        console.log('getAll');
        return res.status(200).json('get req done');
    }

    static async delete(req: Request, res: Response) {

    }
}

export default PostsController