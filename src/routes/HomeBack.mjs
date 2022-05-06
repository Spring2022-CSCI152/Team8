import cors from "cors"
import express from "express"
import { setUpDB, getDeck, getUsers, getDecks, getClient } from '../database.mjs';


const app = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/', async (req, res) => {
    console.log("Homepage request recieved");
    
    const { email, password } = req.body;
    var result;

    //await setUpDB();
    const users = await getUsers();
    var user = await users.findOne({ email: email, password: password });

    if (user == null) { // if user cant be found in database
        result = { message: "Error: user doesn't exist" };
    }
    else
    {
        result = { Decks: await getDecks(user) };
    }
    //getClient().close();
    res.send(result);
})

app.post('/viewCards', async (req, res) => {
    console.log("CardView request recieved");
    const { email, deck } = req.body;
    var result;

    //await setUpDB();
    var d = await getDeck(email, deck);

    if (d == null) { // if user/deck cant be found in database
        result = { message: "Error: user or deck doesn't exist" };
        console.log("Error: user or deck doesn't exist");
    }
    else {
        result = { Deck: d };
    }
    //getClient().close();
    //console.log(result)
    res.send(result);
})

app.post('/deleteDeck', async (req, res) => {
    console.log("Delete deck request recieved");
    const {email, deck: deckName} = req.body;
    var result;
    //console.log(email)

   //await setUpDB();
   var d = await getDecks(email)

   if(d == null) {
        result = {message: "Error: user does not exist" };
   }
   else {
        if (d.find(({ Title }) => Title === deckName ) == null) {
            result = {message: "Error: deck does not exist"};
        }
        else {
            d = d.filter(Title => Title !== deckName);
            const users = getUsers();
            const u = await users.findOne({email: email})
            await users.update({_id: u._id}, {$set:{"Decks" : d}})
            result = {message: "Deck deletion successful"}
        }
    }
    //getClient().close();
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

    //getClient().close();
    //console.log(result)
    res.send(result);
})
app.post('/newDeck', async (req,res) => {
    console.log("New deck request recieved");
    const {email, deck: deckName} = req.body;
    var result;
    //console.log(email)

   await setUpDB();
   var d = await getDecks(email)

   if(d == null) {
        result = {message: "Error: user does not exist" };
   }
   else {
        if (d.find(({ Title }) => Title === deckName ) == null) {
            d.push({Title: deckName, Cards: [], FRScores: [], MScores: [] });
            const users = getUsers();
            const u = await users.findOne({email: email})
            await users.update({_id: u._id}, {$set:{"Decks" : d}})
            result = {message: "Deck creation successful"}
        }
        else {
            result = {message: "Error: deck already exists" }
        }
   }
   //getClient().close();
    //console.log(result)
    res.send(result);
});
app.post('/recieveShareCode', async (req, res) => {
    console.log("Share Code request recieved");
    var result;
    const { code } = req.body;
    if (code == null)
    {
        result = { message: "Error: code isn't valid" };
    }
    else
    {
        const [ email, deckName ] = code.split("_");
    
    
        //await setUpDB();
        var d = await getDeck(email, deckName);

        if (d == null) { // if user/deck cant be found in database
            result = { message: "Error: code isn't valid" };
        }
        else
        {
            result = { Deck: d };
        }
       // getClient().close();
        //console.log(result)
    }
    res.send(result);
})

export default app