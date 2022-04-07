import {
    useState,
    useEffect
} from 'react'
import axios from 'axios'

function useAsync(asyncFn, onSuccess) {
  useEffect(() => {
    let isActive = true;
    asyncFn().then(data => {
      if (isActive) onSuccess(data);
    });
    return () => { isActive = false };
  }, [asyncFn, onSuccess]);
}
function generateID() {
    return Math.random().toString(16).slice(2)
}
function Editor(props) {
    let initialState = {
        content: ''
    }
    const [card, setCard] = useState(initialState)
    async function getCard() {
        let result
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
            if (props.id) {
                let alreadyExists = true
                while (alreadyExists) {
                    card.id = generateID()
                    try {
                        await axios.get(`${process.env.REACT_APP_BASE_URL}/card?id=${card.id}`)
                    } catch (e) {
                        alreadyExists = false
                    }
                }
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
