import {
    useState,
    useEffect
} from 'react'
import axios from 'axios'

const url = `http://localhost:${process.env.PORT}`
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
    if (props.id) {initialState._id = props.id}
    const [card, setCard] = useState(initialState)
    async function getCard() {
        let result
        try {
            console.log("getting card")
            return await axios.get(`${url}/card?_id=${props.id}`)
        } catch (e) {
            console.log("couldn't get card")
            return card
        }
    }
    useAsync(getCard, setCard)
    const inputElem = <input id="card-content" type="text" onChange={handleOnChange} />
    async function save() {
        try {
            await axios.post(`/card`, card)
        } catch (e) {
            console.log(`/card`)
            Error.captureStackTrace(e);
            throw e
        }
    }
    function handleOnChange() {
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
