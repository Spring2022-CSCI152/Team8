import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'
import Editor from './Editor';
import axios from 'axios'
import {type} from '@testing-library/user-event'

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
    fireEvent.change(cardContentField, {target: {value: content}})
    sleep(1000)
    let result
    try {
        result = await axios.get(`${url}/card?id=0`)
    } catch (e) {
        console.log(e)
        throw e
    }
    expect(result.data.content).toEqual(content)
});
