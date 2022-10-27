import * as mysql from 'mysql2/promise';
import { Request, Response } from 'express';

export default class AccountManager {
    pool: mysql.Pool;
    connectionOptions: mysql.PoolOptions;

    constructor(){
        this.connectionOptions = {
            host:process.env.DB_ADDRESS,
            user:process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DEV_NAME,
            waitForConnections: true,
            connectionLimit: 10,
        }
        this.pool = mysql.createPool(this.connectionOptions)
        setTimeout(() => {
            this.testConnection();
        }, 2500);
    }

    async testConnection() {
        const result = await this.pool.getConnection();
        const [rows, fields] = await result.execute(`SELECT * FROM users LIMIT 1`);
    }   

    login(req: Request, res:Response) {
        console.log(req);
        res.sendStatus(200);
    }

    createAccount(req: Request, res: Response) {
        console.log(req);
        res.sendStatus(200);
    }   
}
