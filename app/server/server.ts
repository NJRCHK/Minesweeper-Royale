import express from 'express';
import bodyParser from 'body-parser';
import * as session  from 'express-session';
import * as url from 'url';
import path from 'path';
import expressMySqlSession from 'express-mysql-session';
import GameServer from './services/GameServer.js';
import AccountManager from './services/AccountManager.js';
import dotenv from 'dotenv';
import { UserSession } from '../shared/types.js';
const app = express();

declare module 'express-session' {
    interface SessionData {
        user: UserSession;
    }
}

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
    secret: process.env.SESSIONSTORE_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge:28_800_000
    }
} as session.SessionOptions;

app.use(session.default(sessionOptions));

const accountManager = new AccountManager();
new GameServer(sessionStore);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (__req, res) => {
    res.sendFile(path.resolve(__dirname + '../../dist/index.html'));
});

app.post('/api/createAccount', (req, res) => accountManager.createAccount(req, res));
app.post('/api/signOut', (req,res) => accountManager.signOut(req,res));
app.post('/api/login', (req, res) => accountManager.login(req, res));
app.get('/api/isLoggedIn', (req, res) => accountManager.isLoggedIn(req, res));

app.get('/main.js', (__req, res) => {
    res.sendFile(path.resolve(__dirname + '../../dist/main.js'));
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
