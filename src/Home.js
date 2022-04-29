import "./Home.css";
import PopupNewFlashcardSet from './PopupNewFlashcardSet';
import PopupFlashcardSet from './PopupFlashcardSet';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const DeckList = [
		{categoryText: "cat1"}, 
		{categoryText: "cat2"}, 
		{categoryText: "cat3"}, 
		{categoryText: "cat4"}];

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
	function handleDelete(catText){
		const newList = list.filter((categoryText) => categoryText !== catText);
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
	return <div>
	  <div className="flashCardSets" style = {{
		  display: "flex",
		  flexDirection: "row",
		  flexWrap: "nowrap",
		  justifyContent: "space-around",
		  alignItems: "center",
		  alignContent: "stretch",
	  }}>
		  {DeckList.map(({categoryText}) => (
			<button key={categoryText} className="Cardz" onClick={() => togglePopup1(categoryText)}><b>{categoryText}</b></button>
		  ))}
		  <button className="flashCard" onClick={togglePopup}> + </button>
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
			  <button className="confirm">Confirm</button>
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