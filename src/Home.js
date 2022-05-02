import "./Home.css";
import PopupNewFlashcardSet from './PopupNewFlashcardSet';
import PopupFlashcardSet from './PopupFlashcardSet';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const DeckList = [
		{categoryText: "cat1"}, 
		{categoryText: "cat2"}, 
		{categoryText: "cat3"}, 
		{categoryText: "cat4"},
		{categoryText: "cat5"},
		{categoryText: "cat6"},
		{categoryText: "cat7"},
		{categoryText: "cat8"},
		{categoryText: "cat9"},
		{categoryText: "cat10"},
		{categoryText: "+"},
		{categoryText: "cat12"},
		{categoryText: "cat13"},
		{categoryText: "cat14"},
		{categoryText: "cat15"}];

const Home = props => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpen1, setIsOpen1] = useState(false);
	const [catText, setCatText] = useState("");
	const [list, setList] = React.useState(DeckList);
	
	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	const togglePopup1 = (categoryText) => {
		setIsOpen1(!isOpen1);
		setCatText(categoryText);
	}
	function handleDelete(categoryText){
		const newList = DeckList.filter(e => e.categoryText !== categoryText);
		setList(newList);
	}
	function handleView(email, deckName) {
		const request = {
			email: email,
			deck: deckName
		}
		axios.post("http://localhost:5565/viewCards", request).then((response) =>
			console.log(response.data))
	}
	function handleGenerate(email, deckName) {
		const request = {
			email: email,
			deck: deckName
		}
		axios.post("http://localhost:5565/getShareCode", request).then((response) =>
			console.log(response.data))
	}
	function handleNew(email, deckName) {
		const request = {
			email: email,
			deck: deckName
		}
		axios.post("http://localhost:5565/newDeck", request).then((response) =>
		console.log(response.data))
    }
	return <div>
	  <div className="flashCardSets" style = {{

	  }}>
		  {list.map(({categoryText}) => (
			<button key={categoryText} className="Cardz" onClick={() => togglePopup1(categoryText)}><b>{categoryText}</b></button>
			
			))}
			
		  <button className="Cardz" onClick={togglePopup}><img className="FlashCard" src="https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0="></img></button>
	  </div>
	  {isOpen && <PopupNewFlashcardSet
        content={<>
          <h1>Create New Flashcard Set</h1>
          <div className="form">
			  <label> Enter Title: </label>
			  <br></br>
			  <input type="text" className="textBox"></input>
			  <br></br>
			  <br></br>
			  <label> Enter Share link (Optional): </label>
			  <br></br>
			  <input type="text" className="textBox"></input>
			  <br></br>
			  <br></br>
			  <button className="confirm" onClick={() => handleNew("testuser3@email.com", "deck2")}>Confirm</button>
		  </div>
        </>}
        handleClose={togglePopup}
      />}
	  {isOpen1 && <PopupFlashcardSet
        content={<>
          <h1>Flashcard set <i>{catText}</i> selected</h1>
          <div className="options">
			  <button className="option">Study with Matching</button><br></br>
			  <button className="option">Study with Free Response</button><br></br>
			  <button className="option">View Study Statistics</button><br></br>
			  <button className="option" onClick={() => handleView("testuser@email.com", "deck1")} >View Flashcards</button><br></br>
			  <button className="option">Edit Flashcards</button><br></br>
			  <button className="option" onClick={() => handleDelete(catText)}>Delete Flashcards</button><br></br>
			  <button className="option" onClick={() => handleGenerate("testuser@email.com", "deck1")} >Generate Share Link</button><br></br>
		  </div>
        </>}
        handleClose={togglePopup1}
      />}
    </div>
}

export default Home;