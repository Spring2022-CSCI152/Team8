import cors from "cors"
import express from "express"
import pkg from '../Team8/database.mjs';
const { setUpDB, getCards, getUsers, getClient } = pkg;

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

app.post('/score/new', async (req, res) => {
    await setUpDB()
    let user = await getUsers().findOne({email: req.query.email})
    let deck = user.Decks.find(x => x.Title == req.query.deck)
    if (req.query.scoretype == "fr") {
        deck.FRScores.push(req.body.score)
    } else if (req.query.scoretype == "m") {
        deck.MScores.push(req.body.score)
    }
    getClient().close()
}

app.listen(5565, () => {
    console.log("listening on port 5565")
})
