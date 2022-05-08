import cors from "cors"
import express from "express"
import { setUpDB, getDeck, getUsers, getDecks, getClient } from '../database.mjs';


const router = express.Router();

router.post('/', async (req, res) => {
   // console.log("Homepage request recieved");
    
    const { email } = req.body;
    var result;

    result = { Decks: await getDecks(email) };

    res.send(result);
})

router.post('/viewCards', async (req, res) => {
    //console.log("CardView request recieved");
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

router.post('/deleteDeck', async (req, res) => {
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
            d = d.filter(deck => deck.Title !== deckName);
           // console.log(d)
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

router.post('/getShareCode', async (req, res) => {
    const { email, deck } = req.body;
    var result;

    //await setUpDB();
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
router.post('/newDeck', async (req,res) => {
    //console.log("New deck request recieved");
    const {email, deck: deckName, cards} = req.body;
    var result;
    //console.log(email)

   //await setUpDB();
   var d = await getDecks(email)

   if(d == null) {
        result = {message: "Error: user does not exist" };
   }
   else {
        if (d.find(({ Title }) => Title === deckName ) == null) {
            if(cards == null){
                d.push({Title: deckName, Cards: [], FRScores: [], MScores: [] });
            }
            else {
                d.push({Title: deckName, Cards: cards, FRScores: [], MScores: [] });
            }
            const users = getUsers();
            const u = await users.findOne({email: email})
            await users.update({_id: u._id}, {$set:{"Decks" : d}})
            result = {message: "Deck creation successful", deck: d}
        }
        else {
            result = {message: "Error: deck already exists" }
        }
   }
   //getClient().close();
    //console.log(result)
    res.send(result);
});
router.post('/recieveShareCode', async (req, res) => {
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

router.post('/score/new', async (req, res) => {
   // await setUpDB()
    let user = await getUsers().findOne({email: req.query.email})
    let deck = user.Decks.find(x => x.Title == req.query.deck)
    if (req.query.scoretype == "fr") {
        deck.FRScores.push(req.body.score)
    } else if (req.query.scoretype == "m") {
        deck.MScores.push(req.body.score)
    }
    user.Decks[user.Decks.findIndex(x => x.Title == req.query.deck)] = deck
    const result = await getUsers().replaceOne({email: req.query.email}, user)
    if (result.modifiedCount > 0) {
        res.status(200).send("Success.")
    } else {
        res.status(500).send("Failed to insert.")
    }
    //getClient().close()
})

export default router
