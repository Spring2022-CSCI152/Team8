import cors from "cors"
import express from "express"
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const { MongoClient } = require('mongodb');
var db;
var users;
var client;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

async function setUpDB() {
    // Mongo will not connect unless your IP is whitelisted
    client = new MongoClient(`mongodb+srv://Na:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.ptnk2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    await client.connect()
    db = client.db("myFirstDatabase")
    users = db.collection("Users")
}

function getDB() {
    return db;
}
function getCards() {
    return cards;
}
function getClient() {
    return client;
}

app.post('/login', (req, res) => {
    var result;
    const { email, password } = req.body;
    setUpDB();
    
    if (users.findOne({ email: email, password: password }) != null) { // if user can be found in database
        result = { message: "login successful", user:users.findOne({ email: email, password: password })}; // send success message and user
    }
    else {
        result = {message: "incorrect email or password"};
    }

    client.close();
    res.send(result);
})

app.post('/registration', (req, res) => {
    console.log("AEA");
    var result;
    const { email, password } = req.body;
    setUpDB();

    if (users.findOne({ email: email }) != null) { //if there already exists a user with the given email
        result = {message: "user already exists"};
    }
    else {
        users.addOne({ email: email, password: password }); //add user to database
        result = { message: "registration successful", user: users.findOne({ email: email, password: password })}
    }
    client.close();
    res.send(result);
})

app.listen(5565, () => {
    console.log("listening on port 5565")
})