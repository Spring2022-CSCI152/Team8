import cors from "cors"
import express from "express"
import { setUpDB, getCards, getUsers, getClient } from '../database.mjs';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/login', async (req, res) => {
    console.log("login request recieved");
    var result;
    const { email, password } = req.body;
    await setUpDB();
    const users = getUsers();
    const user = await users.findOne({ email: email, password: password });
    if (user != null) { // if user can be found in database
        result = { message: "login successful", user: user}; // send success message and user
    }
    else {
        result = {message: "incorrect email or password"};
    }

    //client.close();
    console.log(result);
    res.send(result);
})

app.post('/registration', async (req, res) => {
    console.log("registration request recieved");
    var result;
    const { email, password } = req.body;
    await setUpDB();
    const users = getUsers();
    if (await users.findOne({ email: email }) != null) { //if there already exists a user with the given email
        result = {message: "user already exists"};
    }
    else {
        await users.insertOne({ email: email, password: password }); //add user to database
        result = { message: "registration successful", user: users.findOne({ email: email, password: password })}
    }
    res.send(result);
})

app.listen(5565, () => {
    console.log("listening on port 5565")
})