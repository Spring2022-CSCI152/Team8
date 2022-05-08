import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'
import axios from 'axios'
//import { setUpDB, getDeck, getUsers, getDecks, getClient } from '../database.mjs';
import {
    type
} from '@testing-library/user-event'
axios.defaults.adapter = require('axios/lib/adapters/http');

beforeAll(async () => {
    const registered = {
        email: "hometest@email.com",
        password: "password"
    }
    await axios.post("http://localhost:5565/registration", registered).then((response) => {
    })

    const request = {
        email: registered.email,
        deck: "testDeck"
    }
    await axios.post("http://localhost:5565/newDeck", request).then((response) => {
        //console.log(response.data)
    })
});

test.skip('/ViewCards request should return correct deck', async () => {

    const request = {
        email: "hometest@email.com",
        deck: "testDeck"
    }
    await setUpDB();
    const expectedDeck = await getDeck(request.email);
    getClient().close();

    var r;
    axios.post("http://localhost:5565/viewCards", request).then((response) => {
        expect(response.data).toEqual(expectedDeck);
    })

    
});

test('/generateShareCode and /recieveShareCode should be inverse operations', async () => {
    const request1 = {
        email: "hometest@email.com",
        deck: "testDeck"
    }
    var code;

    await axios.post("http://localhost:5565/getShareCode", request1).then((response) => {
        code = response.data.code
    })

    const request2 = {
        code: code
    }

    await axios.post("http://localhost:5565/recieveShareCode", request2).then((response) => {
        expect(response.data).toBeTruthy();
        expect(response.data.Deck.Title).toEqual(request1.deck)
    })
});

test('/veiwCards should return deck', async () => {
    const request = {
        email: "hometest@email.com",
        deck: "testDeck"
    }
    await axios.post("http://localhost:5565/viewCards", request).then((response) => {
        //console.log(response.data)
        expect(response.data.Deck.Cards).toBeTruthy();
        expect(response.data.Deck.Title).toEqual(request.deck);
    })

});

test('/ should return list of decks', async () => {

});