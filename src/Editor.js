import {
    useState,
    useEffect
} from 'react'
import axios from 'axios'

// Performs an async operation for the component.
// Inputs:
//     asyncFn: returns a Promise
//     onSuccess: executed on the data retrieved from asyncFn
function useAsync(asyncFn, onSuccess) {
    useEffect(() => {
        let isActive = true;
        asyncFn().then(data => {
            if (isActive) onSuccess(data);
        });
        return () => {
            isActive = false
        };
    }, [asyncFn, onSuccess]);
}

function Editor(props) {
    const [card, setCard] = useState({
        content: '',
        id: props.id
    })
    async function getCard() {
        try {
            return await axios.get(`${process.env.REACT_APP_BASE_URL}/card?id=${props.id}`)
        } catch (e) {
            return card
        }
    }
    useAsync(getCard, setCard)
    const inputElem = <input id="card-content" type="text" onChange={handleOnChange} />
    async function save() {
        try {
            if (!props.id) {
                card.id = Date.now().toString(36) + Math.random().toString(36).substr(2)  // a random, unique string
                await axios.post(`${process.env.REACT_APP_BASE_URL}/card/new`, card)
            } else {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/card/update`, card)
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    function handleOnChange(event) {
        card.content = event.target.value
        setCard(card)
        save()
    }
    return (
        <div className="Editor">
          <label htmlFor="card-content">Content</label>
          {inputElem}
          <button>Flip</button>
        </div>
    );
}

export default Editor;
