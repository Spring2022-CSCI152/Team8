import {setUpDB} from './src/database.mjs'
import express from 'express'
import cardRoute from './src/routes/cards.route.mjs'
import cors from 'cors'
import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()
const app = express()
setUpDB()
app.use(cors())
app.use(jsonParser)
app.use(cardRoute)
app.listen(process.env.PORT)
