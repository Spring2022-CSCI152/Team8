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
async function getDecks(user) {
    const { email, password } = user;
    const { Decks } = await users.findOne({email: email, password: password});
    //console.log(Decks)
    return Decks;
}
async function getCards(user, deck)
{
    const { email, password } = user;

    const u = await users.findOne({email: email, password: password});
    const {Decks} = u;
    const d = Decks.find(({ Title }) => Title === deck );
    const { Cards: cs } = d;
    //console.log(cs);

    return cs;
}
function getUsers() {
    return users;
}
function getClient() {
    return client;
}

export default{ setUpDB, getDB, getCards, getUsers, getClient };