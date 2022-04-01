import { MongoClient } from 'mongodb'
var db
var cards
var client
import 'dotenv/config'
async function setUpDB() {
    // Mongo will not connect unless your IP is whitelisted
    client = new MongoClient(`mongodb+srv://ianc:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.ptnk2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    await client.connect()
    db = client.db("myFirstDatabase")
    cards = db.collection("Cards")
}
function getDB() {
    return db
}
function getCards() {
    return cards
}
function getClient() {
    return client
}

export { setUpDB, getDB, getCards, getClient }
