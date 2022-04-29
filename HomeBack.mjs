import cors from "cors"
import express from "express"
import pkg from '../Team8/database.mjs';
const { setUpDB, getDeck, getUsers, getDecks, getClient } = pkg;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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
    var d = await getDeck(user, deck);

    if (d == null) { // if user/deck cant be found in database
        result = { message: "Error: user or deck doesn't exist" };
        console.log("Error: user or deck doesn't exist");
    }
    else {
        result = { Deck: d };
    }
    getClient().close();
    //console.log(result)
    res.send(result);
})

app.post('/getShareCode', async (req, res) => {
    const { email, deck } = req.body;
    var result;

    await setUpDB();
    var d = await getDeck(email, deck);

    if (d == null) { // if user/deck cant be found in database
        result = { message: "Error: user or deck doesn't exist" };
        console.log("Error: user or deck doesn't exist");
    }
    else {
        var code = email + "_" + deck;
        result = { code: code };
    }

    getClient().close();
    //console.log(result)
    res.send(result);
})

app.post('/recieveShareCode', async (req, res) => {
    console.log("Share Code request recieved");
    const { code } = req.body;
    const { email, deckName } = code.split("_");
    var result;
    
    await setUpDB();
    const users = getUsers();
    var d = await getDeck(email, id);

    if (d == null) { // if user/deck cant be found in database
        result = { message: "Error: code isn't valid" };
    }
    else
    {
        result = { Deck: d };
    }
    getClient().close();
    //console.log(result)
    res.send(result);
})

app.listen(5565, () => {
    console.log("listening on port 5565")
})