import express from 'express';
import * as url from 'url';
import path from 'path';
import GameServer from './services/GameServer.js';
import AccountManager from './services/AccountManager.js';
import dotenv from 'dotenv';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config({path: path.resolve(__dirname + '../../.env')});

const app = express();
const accountManager = new AccountManager();
new GameServer();

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
