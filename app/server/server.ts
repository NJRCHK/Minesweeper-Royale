import express from 'express';
import * as url from 'url';
import path from 'path';
import GameServer from './services/GameServer.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.get('/', (__req, res) => {
    res.sendFile(path.resolve(__dirname + '../../dist/index.html'));
});

app.get('/main.js', (__req, res) => {
    res.sendFile(path.resolve(__dirname + '../../dist/main.js'));
});

new GameServer();

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
