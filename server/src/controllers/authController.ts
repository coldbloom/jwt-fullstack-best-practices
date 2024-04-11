import {Request, Response} from "express";

class AuthController {
    static async signup(req: Request, res: Response) {
        try {

        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send({ error: `server error: ${e.message}` })
            }
        }
    }

    static async signIn(req: Request, res: Response) {
        try {

        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send({ error: `server error: ${e.message}` })
            }
        }
    }

    static async refresh(req: Request, res: Response) {
        try {

        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send({ error: `server error: ${e.message}` })
            }
        }
    }

    static async logout(req: Request, res: Response) {
        try {

        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send({ error: `server error: ${e.message}` })
            }
        }
    }
}

export default AuthController;