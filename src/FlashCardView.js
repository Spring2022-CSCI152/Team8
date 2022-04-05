import React, {useState} from "react";
import ReactCardFlip from 'react-card-flip';
import axios from "axios";
import "./FlashCardView.css"

//This is a functional component. It holds all the functions
//within it.
const FlashCardView = props => {
    
    //Handling the Card flip
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };
    
    //
    const [categoryText, setCategory] = useState('');
    const [frontText, setFront] = useState('');
    const [backText, setBack] = useState('');
    
    const [submitted, setSubmitted] = useState(false);
    
    // Handling the category text change
    const handleCategory = (e) => {
    setCategory(e.target.value);
        setSubmitted(false);
    };

    // Handling the front text change
    const handleFront = (e) => {
    setFront(e.target.value);
        setSubmitted(false);
    };

    // Handling the back text change
    const handleBack = (e) => {
    setBack(e.target.value);
        setSubmitted(false);
    };

    const handlePrevBtn = () => {
        
    };

    const handleNextBtn = () => {
        
    };
    
    //where all the page style and structure is.
    return (

            <><div>
            <input type="text"
                style={{
                    fontSize: 18,
                    alignContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    height: 25, 
                    width: 500,
                    display: "flex",
                    justifyContent: "space-around",
                    maxWidth: 1080,
                    margin: 0,
                    margin: "auto",
                }}
                data-testid="c-Text"
                readOnly="true"
                placeholder="Category Text"
                onChange={handleCategory}
                value={categoryText} /><br />
        </div><ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedFrontToBack="1.5" flipSpeedBackToFront="1.5" containerStyle={{ maxWidth: 1080, margin: 0, margin: "auto" }}>

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
                        <input 
                        type="text" 
                        className="cardInput" 
                        style={{ fontSize: 18, alignContent: "center" }} 
                        data-testid="f-Text" 
                        placeholder="Front Text"
                        readOnly="true" 
                        onChange={handleFront} 
                        value={frontText} 
                        /><br />
                    </form>
                    <div className="cardNavBtn" style={{display:"flex", flexDirection:"row"}}>
                    <button role="prev" onClick={handlePrevBtn}>Previous</button>
                    <button role="flip" onClick={handleClick}>Flip</button>
                    <button role="next" onClick={handleNextBtn}>Next</button>
                    </div>

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
                        <input 
                        type="text" 
                        className="cardInput" 
                        style={{ fontSize: 18, alignContent: "center" }} 
                        data-testid="b-Text" readOnly="true" 
                        placeholder="Back Text" 
                        onChange={handleBack} 
                        value={backText} />
                        <br />
                    </form>
                    <div className="cardNavBtn" style={{display:"flex", flexDirection:"row"}}>
                    <button role="prev" onClick={handlePrevBtn}>Previous</button>
                    <button role="flip" onClick={handleClick}>Flip</button>
                    <button role="next" onClick={handleNextBtn}>Next</button>
                    </div>
                </div>

            </ReactCardFlip></>

    );

}


export default FlashCardView;



