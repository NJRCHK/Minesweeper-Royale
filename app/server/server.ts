import express from 'express';
import * as url from 'url';
import path from 'path';
import GameServer from './services/GameServer.js';
import AccountManager from './services/AccountManager.js';

new GameServer();
const accountManager = new AccountManager();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();


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
