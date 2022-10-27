import * as mysql from 'mysql2/promise';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export default class AccountManager {
    pool: mysql.Pool;
    connectionOptions: mysql.PoolOptions;
    saltrounds: number;

    constructor(){
        if(process.env.SALTROUNDS === undefined){
            throw(`No saltrounds present in env file`);
        }
        this.connectionOptions = {
            host:process.env.DB_ADDRESS,
            user:process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DEV_NAME,
            waitForConnections: true,
            connectionLimit: 10,
        }
        this.saltrounds = Number(process.env.SALTROUNDS);
        this.pool = mysql.createPool(this.connectionOptions)
        setTimeout(() => {
            this.testConnection();
        }, 2500);
    }

    async testConnection() {
        const result = await this.pool.getConnection();
        const [rows, fields] = await result.execute(`SELECT * FROM users LIMIT 1`);
    }

    validateUsername(username: string) {
        if(username === undefined){
            return false;
        }
        else if (username.length === 0){
            return false;
        }
        return true;
    }

    validatePassword(password:string) {
        if(password === undefined){
            return false;
        }
        else if (password.length < 8){
            return false;
        }
        return true;
    }

    async login(req: Request, res:Response) {
        const username = req.body.username;
        const password = req.body.password;

        if(!this.validateUsername(username)){
            res.sendStatus(400);
            return;
        }
        if(!this.validatePassword(password)){
            res.sendStatus(400);
            return;
        }

        const connection = await this.pool.getConnection();
        let [rows, fields] = await connection.execute("SELECT name, password FROM users WHERE name=?", [username]);
        rows = rows as mysql.RowDataPacket[]
        if(rows.length === 0){
            res.sendStatus(400);
            return;
        }
        let result = await bcrypt.compare(password, rows[0].password);
        if(result){
            res.sendStatus(200);
        }
        res.sendStatus(400);
    }

    async createAccount(req: Request, res: Response) {
        const username = req.body.username;
        const password = req.body.password;

        if(!this.validateUsername(username)){
            res.sendStatus(400);
            return;
        }
        if(!this.validatePassword(password)){
            res.sendStatus(400);
            return;
        }

        let connection = await this.pool.getConnection();
        let [rows, fields] = await connection.execute("SELECT name, password FROM users WHERE name=?", [username]);
        rows = rows as mysql.RowDataPacket[]
        if(rows.length !== 0){
            res.sendStatus(400);
            return;
        }
        const hashedPassword = await bcrypt.hash(password, this.saltrounds);
        connection = await this.pool.getConnection();
        await connection.execute("INSERT INTO users (name, password) VALUES(?, ?)", [username, hashedPassword]);
        res.sendStatus(200);
    }   
}
