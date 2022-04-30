import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const { MongoClient } = require('mongodb');
var db;
var cards;
var users;
var client;
import 'dotenv/config'
async function setUpDB() {
    // Mongo will not connect unless your IP is whitelisted
    client = new MongoClient(`mongodb+srv://Na:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.ptnk2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    await client.connect()
    db = client.db("myFirstDatabase")
    cards = db.collection("Cards")
    users = db.collection("Users")
    
}

function getDB() {
    return db;
}
function getCards() {
    return cards;
}
function getUsers() {
    return users;
}
function getClient() {
    return client;
}

export default{ setUpDB, getDB, getCards, getUsers, getClient };