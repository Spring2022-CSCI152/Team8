import "./Home.css";
import Navbar from "./navbar"
import {Link} from 'react-router-dom'
import Popup from './Popup';
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Matching from './Matching';

const Home = props => {
	if (localStorage.getItem('email') === null) {
		window.location = '/Login';
	}

	const [isOpen, setIsOpen] = useState(false);
	const [isOpen1, setIsOpen1] = useState(false);
	const [catText, setCatText] = useState("");
	const [deckTitle, setTitle] = useState("")
	const [share, setShare] = useState("")
	const [code, setCode] = useState("")

	const [list, setList] = React.useState([]);

	const componentIsMounted = useRef(true);

	useEffect(() => {
		return () => {
			componentIsMounted.current = false;
		};
	}, []); 

	useEffect(() => {
		async function getD() {
		await axios.post(`${process.env.REACT_APP_BASE_URL}/`, { email: localStorage.getItem('email') }).then((response) => {
			//console.log(response.data)
			if (response.data.Decks != null) {
				if (componentIsMounted.current) {
					setList(response.data.Decks);
				}
			}
		})
		}
		getD();
	}, []);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	const togglePopup1 = (categoryText) => {
		setIsOpen1(!isOpen1);
		setCatText(categoryText);
		localStorage.setItem("title", JSON.stringify(categoryText));
		console.log(localStorage.getItem("title"));
	}
	function handleDelete(categoryText){
		const newList = list.filter(e => e.categoryText !== categoryText);
		setList(newList);
		axios.post(`${process.env.REACT_APP_BASE_URL}/deleteDeck`, { email: localStorage.getItem('email'), deck: categoryText }).then((response) => {
			
		})
	}
	function handleView(deckName) {
		localStorage.setItem('deck', deckName);
	}
	function handleGenerate(deckName) {
		const request = {
			email: localStorage.getItem('email'),
			deck: deckName
		}
		axios.post(`${process.env.REACT_APP_BASE_URL}/getShareCode`, request).then((response) => {
			setCode(response.data.code);
		})
	}
	function handleNew(deckName, code) { // deckName and code are optional (at least 1 required, both ok)
		var newlist = list;
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
					newlist.push(response.data.deck);
					localStorage.setItem('deck', response.data.deck.Title)
				})
			})
		}
		else {
			axios.post(`${process.env.REACT_APP_BASE_URL}/newDeck`, { email: localStorage.getItem('email'), deck: deckName }).then((response) => {
				newlist.push(response.data.deck);
				localStorage.setItem('deck', response.data.deck.Title)
			})
		}
		setList(newlist);
    }
	return <div>
	  <Navbar />
	  <div className="flashCardSets" style = {{

	  }}>
		  {list.map(({Title}) => (
			<button key={Title} className="Cardz" onClick={() => togglePopup1(Title)}><b>{Title}</b></button>
			
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
			  <input type="text" className="textBox" onChange={e => setShare(e.target.value)}></input>
			  <br></br>
			  <br></br>
			  <button className="confirm" onClick={() => handleNew(deckTitle)}><Link className="confirmLink" to="/view" state={{ title: deckTitle }}>Confirm</Link></button>
			  
		  </div>
        </>}
        handleClose={togglePopup}
      />}
	  {isOpen1 && <Popup
        content={<>
          <h1><i>{catText}</i></h1>
          <div className="options">
					<button className="option" onClick={() => handleView(catText)}><Link className="optionLink" to="/matching" state={{ title: catText }}>Study with Matching</Link></button>
					<button className="option" onClick={() => handleView(catText)}><Link className="optionLink" to="/freeResponse" state={{ title: catText }}>Study with Free Response</Link></button>
					<button className="option" onClick={() => handleView(catText)}><Link className="optionLink" to="/graph" state={{ title: catText }}>View Study Statistics</Link></button>
					<button className="option" onClick={() => handleView(catText)}><Link className="optionLink" to="/view" state={{ title: catText }}>View Flashcards</Link></button>
					<button className="option" onClick={() => handleView(catText)}><Link className="optionLink" to="/view" state={{ title: catText }}>Edit Flashcards</Link></button>
			        <button className="option" onClick={() => handleDelete(catText)}>Delete Deck</button>
					<button className="option" onClick={() => handleGenerate(catText)} >Generate Share Link</button>
					<h3>Share Link: {code}</h3>
		  </div>
        </>}
        handleClose={togglePopup1}
      />}
    </div>
}

export default Home;