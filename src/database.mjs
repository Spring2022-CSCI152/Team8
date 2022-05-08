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
async function getDecks(email) {
//console.log(email)
    const u = await users.findOne({"email": email});
    if (u == null)
    {
        console.log("user does not exist")
        return null
    }
    const {Decks} = u;
    //console.log(Decks)
    return Decks;
}

async function getDeck(email, deck)
{
    const u = await users.findOne({email: email});
    if (u == null)
    {
        console.log("user does not exist")
        return null
    }
    
    const {Decks} = u;
    const d = Decks.find(({ Title }) => Title === deck );
    return d;
}
function getUsers() {
    return users;
}
function getClient() {
    return client;
}
async function getCard(email, deckTitle, index) {
    const deck = await getDeck(email, deckTitle)
    return deck.Cards[index]
}


export { setUpDB, getDeck, getUsers, getDecks, getClient, getCard };
