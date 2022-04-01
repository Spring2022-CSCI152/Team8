import {
    useState,
    useEffect
} from 'react'
import axios from 'axios'

const url = `http://localhost:${process.env.PORT}`

function Editor(props) {
    let initialState = {
        content: ''
    }
    if (props.id) {initialState._id = props.id}
    const [card, setCard] = useState()
    useEffect(() => {
        async function getCard() {
            let result
            try {
                result = await axios.get(`${url}/card?_id=${props.id}`)
            } catch (e) {
                result = card
            }
            setCard(result)
        }
        getCard()
    }, [])
    const inputElem = <input id="card-content" type="text" onChange={handleOnChange} />
    async function save() {
        try {
            await card
            console.log(card)
            await axios.post(`${url}/card`, card)
        } catch (e) {
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
