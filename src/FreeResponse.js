import React, {useState} from "react";
import ReactCardFlip from 'react-card-flip';
import "./FlashCardView.css"
import axios from "axios";


const FlashCardList = [
    {
        front: "front0",
        back: "back0"
    },

    {
        front: "front1",
        back: "back1"
    },

    {
        front: "front2",
        back: "back2"
    },
    {
        front: "front3",
        back: "back3"
    }
]

//This is a functional component. It holds all the functions
//within it.
const FreeResponse = props => {
    const [index, setIndex] = useState(0);

    const [cardList, setCardList] = React.useState(FlashCardList);

    const [cardFront,setFront] = useState(cardList[index].front);
    const [cardBack,setBack] = useState(cardList[index].back);

    //Handling the Card flip
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    //handles when user clicks next button
    const handleNextBtn = () => {

        document.getElementById("b-Text").style.display='none';
        setIsFlipped(false);

        if (index === cardList.length-1)
        {
            return;
        }
        else
        {
            setIndex(index + 1);
        }

        setAnswer('');

        document.getElementById("checkBtn").style.display='block';
        document.getElementById("flipBtn").style.display='none';
        document.getElementById("nextBtn").style.display='none';

    };

    const [answer, setAnswer] = useState('');
    const [submittedAnswer, setSubmittedAnswer] = useState(false);

    // Handling the change to answer
    const handleAnswer = (e) => {
        setAnswer(e.target.value);
        setSubmittedAnswer(false);
        };

    //handles the events that happen when the Save button is clicked
    const handleCheckBtn = (e) => {


        if (answer === cardList[index].back)
        {
            setNumCorrect(numCorrect + 1);
        }

        if (index === cardList.length-1)
        {
            setIsFlipped(!isFlipped);
            document.getElementById("answer-card-box").style.display='none';
            document.getElementById("score-card-box").style.display='block';
            document.getElementById("b-Text").style.display='block';
            setIsFlipped(!isFlipped);

        }

        else{
        document.getElementById("b-Text").style.display='block';
        document.getElementById("checkBtn").style.display='none';
        setIsFlipped(!isFlipped);
        document.getElementById("flipBtn").style.display='block';
        document.getElementById("nextBtn").style.display='block';
        }

        
    };

    const [numCorrect, setNumCorrect] = useState(0);
    const [possCorrect, setPossCorrect] = useState(cardList.length);

    const [isOpen, setIsOpen] = useState(false); /***need this***/
    const [percent, setPercent] = useState(0); /***need this***/

    var number = (numCorrect/possCorrect)*100;


    //handles when user clicks saveScore button
    const handleSaveScoreBtn = () => {

    

    };
		
		

    return (
    <>
        <header>
            <div className="container">
                <div className="nav">
                    <h10>Free Response</h10>
                    <div>
                        <h20>Score: {numCorrect}/{possCorrect}</h20>
                    </div>
                </div>
            </div>
        </header>
        
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedFrontToBack="1.5" flipSpeedBackToFront="1.5" containerStyle={{ maxWidth: 1080, margin: 0, margin: "auto"}}>
            
                <div style={{
                    backgroundColor: "#EEEEEE",
                    height: 500,
                    width: 500,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "column",
                    maxWidth: 1080, margin: 0, margin: "auto",
                }}
                >
                    
                    <form>
                        <div className="cardInfo">
                            <div>Front</div>
                            <div>{index + 1 }/{cardList.length}</div>
                        </div>
                
                        <input
                            type="text"
                            className="cardInput"
                            style={{ fontSize: 18, alignContent: "center" }}
                            id="f-Text"
                            readOnly="true"
                            placeholder="Front Text"
                            value={cardList[index].front} />
                            <br />
                    </form>
                
                </div>
                <div style={{
                    backgroundColor: "#EEEEEE",
                    height: 500,
                    width: 500,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "column",
                    maxWidth: 1080, margin: 0, margin: "auto",
                }}
                >
    
                    <form>
                    <div className="cardInfo">
                            <div>Back</div>
                            <div>{index + 1 }/{cardList.length}</div>
                        </div>
                
                        <input
                            type="text"
                            className="cardInput"
                            style={{ fontSize: 18, alignContent: "center" }}
                            id="b-Text"
                            readOnly="true"
                            placeholder="Back Text"
                            value={cardList[index].back} /><br />
                    </form>
    
                </div>
        </ReactCardFlip>


        <div class="answerContainer">
            <div className="cardBoxAnswer" id="answer-card-box" data-testid="answer-card-box">
                <h20>Answer:</h20>
                <div className="textAreas">
                    <textarea 
                        className="answer" 
                        id="answer-text" 
                        style={{textAlign:"center"}}
                        placeholder="Enter answer here" 
                        value={answer}
                        onChange={handleAnswer}>
                    </textarea>
                </div>
                <div className="cardAnswerBtn">
                    <button className="checkAnswer" id="checkBtn" onClick={handleCheckBtn}>Check Answer</button>
                    <button role="flip" id="flipBtn" style={{display:"none"}} onClick={handleClick}>Flip</button>
                    <button role="next" id="nextBtn" style={{display:"none"}} onClick={handleNextBtn}>Next</button>
                </div>
            </div>
        </div>       

        <div class="scoreContainer">
            <div className="cardBoxScore" id="score-card-box" data-testid="score-card-box">
                <h20>Score:</h20>
                <div className="scorePercentage">{number}%</div>
                <div className="cardScoreBtn">
                    <button role="saveScore" id="nextBtn" onClick={handleSaveScoreBtn}>Save Score</button>
                </div>
            </div>
        </div>   

    
    </>
    );
}


export default FreeResponse;