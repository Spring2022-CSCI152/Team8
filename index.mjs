import {setUpDB} from './src/database.mjs'
import express from 'express'
import cardRoute from './src/routes/cards.route.mjs'
import loginRoute from './src/routes/LoginBackEnd.mjs'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
const jsonParser = bodyParser.json()
const app = express()
setUpDB()
app.use(cors())
app.use(jsonParser)
app.use(cardRoute)
app.use(express.static('build'));
app.listen(process.env.PORT)
