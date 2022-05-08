import {
    setUpDB
} from './src/database.mjs'
import express from 'express'
import cardRoute from './src/routes/cards.route.mjs'
import loginRoute from './src/routes/LoginBackEnd.mjs'
import homeRoute from './src/routes/HomeBack.mjs'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
const jsonParser = bodyParser.json()
const app = express()
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
await setUpDB()
app.use(cors())
app.use(jsonParser)
app.use(cardRoute)
app.use(loginRoute)
app.use(homeRoute)
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT)
