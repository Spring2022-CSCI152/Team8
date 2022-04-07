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
function Editor(props) {
    let initialState = {
        content: ''
    }
    if (props.id) {initialState.id = props.id}
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
            console.log(card)
            await axios.post(`${process.env.REACT_APP_BASE_URL}/card`, card)
        } catch (e) {
            Error.captureStackTrace(e);
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
