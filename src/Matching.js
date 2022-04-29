import arrayShuffle from 'array-shuffle';
import PopupScore from './PopupScore';
import React, {useState} from 'react';
import "./Matching.css";

const Matching = props => {
	
	const FlashCard = [
		{
			categoryText: "cat1",
			cardFront: "helloswewaefsgrdhtfawesgrdhaegsrehdt",
			cardBack: "waesdfrgnhwaesdfgbvasdfbgaesdr",
		}, 
		{
			categoryText: "cat1",
			cardFront: "him",
			cardBack: "her",
		}, 
		{
			categoryText: "cat1",
			cardFront: "this",
			cardBack: "that",
		}, 
	];
	
	const [isOpen, setIsOpen] = useState(false); /***need this***/
	const mixed = arrayShuffle(FlashCard);
	const [percent, setPercent] = useState(0); /***need this***/
	const getAnswers = mixed => {
		let content = [];
		for (let i = 0; i < mixed.length; i++) {
			const item = mixed[i];
			content.push(document.getElementById(item.cardFront).value);
		}
		return content;
	};
	
	/***need this function***/
	const togglePopup = () => {
		
		/***This code is to calculate percentage. This will be different for you***/
		var correct = mixed;
		var correctAnswers = mixed.map(function(value) {return value.cardBack;});
		var Answer = getAnswers(correct);
		var result = [];
		if (JSON.stringify(correctAnswers) === JSON.stringify(Answer)){setPercent(100);}
		else {
			correctAnswers.forEach(function(element, index) {if (element === Answer[index]){result.push(element);}})
			
			/***sets percent to display score. Might be a little different for you but its needed.***/
			var number = (result.length/mixed.length)*100;
			setPercent(number.toFixed(2)); 
		}
		
		
		setIsOpen(!isOpen); /***need this***/
	}

return (
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
            <tr key={flashcard.cardFront}>
              <td>{flashcard.cardFront}</td>
              <td>
				<select id={flashcard.cardFront}>
				<option></option>
				{FlashCard.map((cb) => (
				  <option>{cb.cardBack}</option>
				))}
				</select>
			</td>
            </tr>
          ))}
        </tbody>
      </table>
	/***From here***/
	  <button id="submit" onClick={togglePopup}> Submit </button>
	  {isOpen && <PopupScore
        	content={<>
          		<h1>Score</h1>
          		<div>
			  <p id="percent"> {percent}% </p>
			  <div>
				<button id="Pop" style={{marginRight: 40}}>View Incorrect Answers</button>
				<button id="Pop">Back to home page</button>
			  </div>
		  	</div>
        	</>}
        	handleClose={togglePopup}
      		/>}
	/***to here***/
	 </div>
    )
 
}

export default Matching;