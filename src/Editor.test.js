import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'
import Editor from './Editor';
import axios from 'axios'
import {
    type
} from '@testing-library/user-event'

test('renders card content field', () => {
    render(<Editor />);
    const cardContentField = screen.getByLabelText(/content/i);
    expect(cardContentField).toBeInTheDocument();
});

test('renders flip button', () => {
    render(<Editor />);
    const flipButton = screen.getByRole(/button/i, {
        name: "Flip"
    });
    expect(flipButton).toBeInTheDocument();
});

test('editing creates new card', async () => {
    const content = "special QuickCognition development test card"
    const url = `http://localhost:${process.env.PORT}`

    // delete old card if it exists, so as not to affect the test
    try {
        await axios.delete(`${url}/card/delete?id=0`)
    } catch (e) {}
    let oldCard
    try {
        oldCard = await axios.get(`${url}/card?id=0`)
    } catch (e) {
        oldCard = null
    }
    expect(oldCard).toBeNull()

    render(<Editor id="0" />)
    const cardContentField = screen.getByLabelText('Content');
    fireEvent.change(cardContentField, {
        target: {
            value: content
        }
    })
    let result
    try {
        result = await axios.get(`${url}/card?id=0`)
    } catch (e) {
        console.log(e)
        throw e
    }
    expect(result.data.content).toEqual(content)
});
