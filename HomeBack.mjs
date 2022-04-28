import cors from "cors"
import express from "express"
import pkg from '../Team8/database.mjs';
const { setUpDB, getCards, getUsers, getClient } = pkg;
import {userSchema} from "schemas"
import Ajv from "ajv"
const ajv = new Ajv()

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// inserts or updates
async function upsert(req, res, isValid, collection, isNew) {
    if (isValid(req.body)) {
        let result
        try {
            if (req.body == null) {
                res.status(400).send("request body cannot be null.")
                return
            }
            if (isNew) {
                result = await collection.insertOne(req.query, req.body)
            } else {
                result = await collection.updateOne(req.query, {
                    $set: req.body
                })
            }
        } catch (e) {
            console.log(e)
            throw e
        }
        if (result.matchedCount > 0 || isNew) {
            res.status(200).send(result)
        } else {
            res.status(500).send("Failed to insert.")
        }
    } else {
        res.status(400).send("Invalid request schema.")
    }
}
app.post('/', async (req, res) => {
    console.log("Homepage request recieved");
    
    const { email, password } = req.body;
    var result;

    await setUpDB();
    const users = getUsers();
    var user = await users.findOne({ email: email, password: password });

    if (user == null) { // if user cant be found in database
        result = { message: "Error: user doesn't exist" };
    }
    else
    {
        result = { Decks: await getDecks(user) };
    }
    getClient().close();
    res.send(result);
})

app.post('/viewCards', async (req, res) => {
    console.log("CardView request recieved");
    const { email, deck } = req.body;
    var result;

    await setUpDB();
    const users = getUsers();
    var user = await users.findOne({ email: email});

    if (user == null) { // if user cant be found in database
        result = { message: "Error: user doesn't exist" };
        console.log("Error: user doesn't exist");
    }
    else {
        result = { Cards: await getCards(user, deck) };
    }
    getClient().close();
    //console.log(result)
    res.send(result);
})

app.post('/', async (req, res) => {
    await setUpDB()
    await upsert(requestValidator, await getUsers(), 
    getClient().close()
}

app.listen(5565, () => {
    console.log("listening on port 5565")
})
