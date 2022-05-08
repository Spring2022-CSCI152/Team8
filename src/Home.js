import "./Home.css";
import {Link} from 'react-router-dom'
import Popup from './Popup';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Matching from './Matching';

async function getd() {
	await axios.post(`${process.env.REACT_APP_BASE_URL}/`, { email: localStorage.getItem('email') }).then((response) => {
		return response.data.Decks;
	})
}

const Home = props => {
	if(localStorage.getItem('email') === null){
		window.location = '/Login';
	}
	
	const [isOpen, setIsOpen] = useState(false);
	const [isOpen1, setIsOpen1] = useState(false);
	const [catText, setCatText] = useState("");
	const [deckTitle, setTitle] = useState("")
	const [list, setList] = React.useState([]);

	getd().then((d) => {
		if (d != null)
			setList(d);
    })
	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	const togglePopup1 = (categoryText) => {
		setIsOpen1(!isOpen1);
		setCatText(categoryText);
	}
	function handleDelete(categoryText){
		const newList = list.filter(e => e.categoryText !== categoryText);
		setList(newList);
		axios.post(`${process.env.REACT_APP_BASE_URL}/deleteDeck`, { email: localStorage.getItem('email'), deck: categoryText }).then((response) => {
			
		})
	}
	function handleView(deckName) {
		localStorage.setItem("deck", JSON.stringify(deckName))
		window.location = '/view';
	}
	function handleGenerate(deckName) {
		const request = {
			email: localStorage.getItem('email'),
			deck: deckName
		}
		axios.post(`${process.env.REACT_APP_BASE_URL}/getShareCode`, request).then((response) => {
			//do something with response.data.code
		})
	}
	function handleNew(deckName, code) { // deckName and code are optional (at least 1 required, both ok)
		if (code != null) {
			axios.post(`${process.env.REACT_APP_BASE_URL}/recieveShareCode`, { email: localStorage.getItem('email'), deck: deckName }).then((response) => {
				var request = {
					email: localStorage.getItem('email'),
					deckName: deckName,
					cards: response.data.Deck.Cards
				}
				if (request.deckName == null) {
					request.deckName = response.data.Deck.Title;
				}
				axios.post(`${process.env.REACT_APP_BASE_URL}/newDeck`, request).then((response) => {
					// gets updated decklist from database
					getd().then((d) => {
						if (d != null)
							setList(d);
					})
				})
			})
		}
		else {
			axios.post(`${process.env.REACT_APP_BASE_URL}/newDeck`, { email: localStorage.getItem('email'), deck: deckName }).then((response) => {
				// gets updated decklist from database
				getd().then((d) => {
					if (d != null)
						setList(d);
				})
			})
		}
    }
	return <div>
	  <div className="flashCardSets" style = {{

	  }}>
		  {list.map(({categoryText}) => (
			<button key={categoryText} className="Cardz" onClick={() => togglePopup1(categoryText)}><b>{categoryText}</b></button>
			
			))}
			
		  <button className="Cardz" onClick={togglePopup}><img className="FlashCard" src="https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0="></img></button>
	  </div>
	  {isOpen && <Popup
        content={<>
          <h1>Create New Flashcard Set</h1>
          <div className="form">
			  <label> Enter Title: </label>
			  <br></br>
			  <input type="text" className="textBox" onChange={e => setTitle(e.target.value)}></input>
			  <br></br>
			  <br></br>
			  <label> Enter Share link (Optional): </label>
			  <br></br>
			  <input type="text" className="textBox"></input>
			  <br></br>
			  <br></br>
			  <button className="confirm" onClick={() => handleNew("testuser3@email.com", "deck2")}><Link className="confirmLink" to="/view" state={{ title: deckTitle }}>Confirm</Link></button>
		  </div>
        </>}
        handleClose={togglePopup}
      />}
	  {isOpen1 && <Popup
        content={<>
          <h1><i>{catText}</i></h1>
          <div className="options">
			  <button className="option"><Link className="optionLink" to="/matching" state={{ title: catText }}>Study with Matching</Link></button>
			  <button className="option"><Link className="optionLink" to="/freeResponse" state={{ title: catText }}>Study with Free Response</Link></button>
			  <button className="option"><Link className="optionLink" to="/graph" state={{ title: catText }}>View Study Statistics</Link></button>
			  <button className="option" onClick={() => handleView("testuser@email.com", "deck1")}><Link className="optionLink" to="/view" state={{ title: catText }}>View Flashcards</Link></button>
			  <button className="option"><Link className="optionLink" to="/view" state={{ title: catText }}>Edit Flashcards</Link></button>
			  <button className="option" onClick={() => handleDelete(catText)}>Delete Flashcards</button>
			  <button className="option" onClick={() => handleGenerate("testuser@email.com", "deck1")} >Generate Share Link</button>
		  </div>
        </>}
        handleClose={togglePopup1}
      />}
    </div>
}

export default Home;