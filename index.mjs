import {setUpDB} from './src/database.mjs'
import express from 'express'
import cardRoute from './src/routes/cards.route.mjs'
import cors from 'cors'
setUpDB()
const app = express()
app.use(cors())
app.use(cardRoute)
app.listen(process.env.PORT)
