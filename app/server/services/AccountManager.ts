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
        this.verifyTableFormats();
    }

    async verifyTableFormats() {
        const userTableExists = await this.usersTableExists();
        if(!userTableExists){
            this.createUsersTable();
        }
    }

    async createUsersTable() {
        const connection = await this.pool.getConnection();
        await connection.execute(
            `CREATE TABLE users 
            (name VARCHAR(255), 
            password VARCHAR(255));`
        );
    }

    async usersTableExists() {
        const connection = await this.pool.getConnection();
        const [rows, fields] = await connection.execute(`SELECT * FROM information_schema.TABLES WHERE (TABLE_SCHEMA=?) AND (TABLE_NAME = 'users')`, [process.env.DB_DEV_NAME]);
        return ((rows as mysql.RowDataPacket[]).length > 0);
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
            req.session.user = {
                loggedIn:true,
                username:username
            }
            res.sendStatus(200);
            return;
        }
        res.sendStatus(400);
    }

    async signOut(req: Request, res: Response) {
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            }
        });
        res.sendStatus(200);
    }

    isLoggedIn(req: Request, res: Response){
        try{
            if(!req.session.user){
                res.sendStatus(401);
                return;
            }
            let data = {
                loggedIn: true,
                username: req.session.user.username
            }
            res.send(JSON.stringify(data));
            return;
        }
        catch {
            res.sendStatus(401);
        }
    }

    async isUsernameTaken(username: String) {
        let connection = await this.pool.getConnection();
        let [rows, fields] = await connection.execute("SELECT name, password FROM users WHERE name=?", [username]);
        rows = rows as mysql.RowDataPacket[]
        if(rows.length !== 0){
            return true;
        }
        return false;
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

        const usernameTaken = await this.isUsernameTaken(username);
        if(usernameTaken){
            res.sendStatus(400);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, this.saltrounds);
        const connection = await this.pool.getConnection();
        await connection.execute("INSERT INTO users (name, password) VALUES(?, ?)", [username, hashedPassword]);
        req.session.user = {
            loggedIn:true,
            username:username
        }
        res.sendStatus(200);
    }   
}
