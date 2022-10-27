import { Request, Response } from 'express';

export default class AccountManager {
    login(req: Request, res:Response) {
        console.log(req);
        res.sendStatus(200);
    }

    createAccount(req: Request, res: Response) {
        console.log(req);
        res.sendStatus(200);
    }   
}
