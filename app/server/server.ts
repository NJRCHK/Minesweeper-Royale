import express from 'express';
import bodyParser from 'body-parser';
import * as session  from 'express-session';
import * as url from 'url';
import path from 'path';
import expressMySqlSession from 'express-mysql-session';
import GameServer from './services/GameServer.js';
import AccountManager from './services/AccountManager.js';
import dotenv from 'dotenv';
const app = express();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config({path: path.resolve(__dirname + '../../.env')});

const databaseOptions = {
    host:process.env.DB_ADDRESS,
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    port: 3306
}
let sessionStore = new (expressMySqlSession(session))(databaseOptions);

const sessionOptions = {
    key: process.env.SESSIONSTORE_KEY,
    secret: process.env.SESSIONSTORE_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: false
} as session.SessionOptions;

app.use(session.default(sessionOptions));

const accountManager = new AccountManager();
new GameServer();

app.use(bodyParser.json());

app.get('/', (__req, res) => {
    res.sendFile(path.resolve(__dirname + '../../dist/index.html'));
});

app.post('/api/createAccount', (req, res) => accountManager.createAccount(req, res));

app.post('/api/login', (req, res) => accountManager.login(req, res));

app.get('/main.js', (__req, res) => {
    res.sendFile(path.resolve(__dirname + '../../dist/main.js'));
});

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
