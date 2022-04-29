import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'
import axios from 'axios'
//import pkg from '../Team8/database.mjs';
const { setUpDB, getCards, getUsers, getClient } = pkg;
import {
    type
} from '@testing-library/user-event'

test.skip('/ViewCards request should return correct deck', async () => {

    const request = {
        email: "testuser@email.com",
        deck: "deck1"
    }
    await setUpDB();
    const expectedDeck = await getDeck(request.email);
    getClient().close();

    var r;
    axios.post("http://localhost:5565/viewCards", request).then((response) => {
        expect(response.data).toEqual(expectedDeck);
    })

    
});

test('/generateCode and /recieveCode should be inverse operations', () => {S

});

test('', () => {
    S

});