import cors from "cors"
import express from "express"
import pkg from '../Team8/database.mjs';
const { setUpDB, getCards, getUsers, getClient } = pkg;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/login', (req, res) => {
    console.log("login request recieved");
    var result;
    const { email, password } = req.body;
    setUpDB();
    const users = getUsers();

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
    console.log("registration request recieved");
    var result;
    const { email, password } = req.body;
    setUpDB();
    const users = getUsers();

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