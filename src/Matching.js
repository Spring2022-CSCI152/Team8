import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'
import Popup from './Popup';
import arrayShuffle from 'array-shuffle';
import './Matching.css'
import axios from "axios";
import Navbar from './navbar'

const Matching = props => {
	
	if(localStorage.getItem('email') === null){
		window.location = '/Login';
	}

	const email = localStorage.getItem('email')
	const deck = localStorage.getItem('deck')


	const componentIsMounted = useRef(true);

	useEffect(() => {
		return () => {
			componentIsMounted.current = false;
		};
	}, []);

	useEffect(() => {
		async function getC() {
			await axios.post(`${process.env.REACT_APP_BASE_URL}/viewCards`, { email: email, deck: deck }).then((response) => {
				//console.log(response.data)
				if (response.data.Deck != null) {
					if (componentIsMounted.current) {
						//console.log(response.data.Deck.Cards)
						setMixed(arrayShuffle(response.data.Deck.Cards));
						setCardList(response.data.Deck.Cards);
					}
				}
			})
		}
		getC();
	}, []);

	const [isOpen, setIsOpen] = useState(false);
	const [cardList, setCardList] = React.useState([]); //unmixed card list
	const [mixed, setMixed ]= useState([])
	const [percent, setPercent] = useState(0);
	const getAnswers = mixed => {
		let content = [];
		for (let i = 0; i < mixed.length; i++) {
			const item = mixed[i];
			content.push(document.getElementById(item.Front).value);
		}
		return content;
	};
	
	const togglePopup = () => {
	
		var correct = mixed;
		var correctAnswers = mixed.map(function(value) {return value.Back;});
		var Answer = getAnswers(correct);
		var result = [];
		if (JSON.stringify(correctAnswers) === JSON.stringify(Answer)){setPercent(100);}
		else {
			correctAnswers.forEach(function(element, index) {if (element === Answer[index]){result.push(element);}})
			
			var number = (result.length/mixed.length)*100;
			setPercent(number.toFixed(2)); 
		}
		
		setIsOpen(!isOpen);
	}

    const handleSaveScoreBtn = () => {
		axios.post(`${process.env.REACT_APP_BASE_URL}/score/new?email=${localStorage.getItem('email')}&deck=${localStorage.getItem('deck')}&scoretype=m`, { score: parseFloat(percent) })
    }

return (
	<>
	<Navbar />
	 <div id="backgroundBox">
	   <table className="table table-bordered">
        <thead>
          <tr>
            <th className="front">Front</th>
            <th>Back</th>
          </tr>
        </thead>
        <tbody>
          {mixed.map((flashcard) => (
            <tr key={flashcard.Front}>
              <td>{flashcard.Front}</td>
              <td>
				<select id={flashcard.Front}>
				<option></option>
				{cardList.map((cb) => (
				  <option>{cb.Back}</option>
				))}
				</select>
			</td>
            </tr>
          ))}
        </tbody>
      </table>
	  <button id="submit" onClick={togglePopup}> Submit </button>
	  {isOpen && <Popup
        	content={<>
          		<h1>Score</h1>
          		<div>
					<p id="percent"> {percent}% </p>
					<div>
						<button role="saveScore" id="saveBtn" onClick={handleSaveScoreBtn}>Save Score</button>
						//<button id="Pop" style={{ marginRight: 40 }}></button>
						//<button id="Pop">Back to home page</button>
					</div>
				</div>
        	</>}
        	handleClose={togglePopup}
      		/>}
	 </div>
	 </>
    )
 
}

export default Matching;

