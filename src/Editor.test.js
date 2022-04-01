import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'
import Editor from './Editor';
import axios from 'axios'

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
    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    const content = "special QuickCognition development test card"
    const url = `http://localhost:${process.env.PORT}`
    try {
        await axios.delete(`${url}/card/delete?_id=0`)
    } catch (e) {}
    let oldCard
    try {
        oldCard = await axios.get(`${url}/card?_id=0`)
    } catch (e) {
        oldCard = null
    }
    expect(oldCard).toBeNull()
    const cardContentField = screen.getByLabelText(/content/i);
    render(<Editor id="0" />)
    cardContentField.value = content
    fireEvent.change(cardContentField)
    let card
    try {
        card = await axios.get(`${url}/card?_id=0`)
    } catch (e) {
        Error.captureStackTrace(e)
        throw e
    }
    expect(card.content).toEqual(content)
});
