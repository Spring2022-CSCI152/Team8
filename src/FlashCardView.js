import React, {useState} from "react";
import ReactCardFlip from 'react-card-flip';
import { useLocation } from 'react-router-dom'
import axios from "axios";
import "./FlashCardView.css"
import Navbar from "./navbar"


//This is a functional component. It holds all the functions
//within it.

const FlashCardView = props => {
	if(localStorage.getItem('email') === null){
		window.location = '/Login';
	}
	const title = localStorage.getItem('title');
	console.log(title);
	
    const [index, setIndex] = useState(0);
    const [cardList, setCardList] = React.useState([]);
    
    const email = "testuser3@email.com";
    const deck = "Deck1";
    
    axios.post(`${process.env.REACT_APP_BASE_URL}/viewCards`, {email: email, deck: deck}).then((response) => {
        setCardList(response.data.Deck.Cards);
    })

    

    //Handling the Card flip
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };
    
    //handles when user clicks previous button
    const handlePrevBtn = () => {
        if (index === 0)
        {
            setIndex(cardList.length - 1);
        }
        else
        {
            setIndex(index - 1);
        }
    };

    //handles when user clicks next button
    const handleNextBtn = () => {
        if (index === cardList.length-1)
        {
            setIndex(0);
        }
        else
        {
            setIndex(index + 1);
        }
    };

    //handles the events that happen when the Add Card button is clicked
    const handleAddBtn = (e) => {
        document.getElementById("add-card-box").style.display='block';
    };

    //handles the events that happen when the Edit Card button is clicked
    const handleEditBtn = (e) => {
        document.getElementById("edit-card-box").style.display='block';
        setFrontEdit(cardList[index].front);
        setBackEdit(cardList[index].back);
    };

    const handleDeleteBtn = () => {
        let newCardList = cardList;
        newCardList.splice(index,1);
        setCardList(newCardList);

        axios.delete(`${process.env.REACT_APP_BASE_URL}/card/delete?email=${encodeURIComponent(email)}&deck=${deck}&index=${index}`, {})
        handlePrevBtn();
        
    };
    
    //handles the events in the add card box
    const [frontAdd, setFrontAdd] = useState('');
    const [backAdd, setBackAdd] = useState('');
    const [submittedAdd, setSubmittedAdd] = useState(false);

    // Handling the change to front text of add card
    const handleFrontAdd = (e) => {
        setFrontAdd(e.target.value);
            setSubmittedAdd(false);
        };

    // Handling the change to back text of add card
    const handleBackAdd = (e) => {
        setBackAdd(e.target.value);
            setSubmittedAdd(false);
        };

    //handles the events that happen when the Save button is clicked
    const handleSaveBtn = (e) => {
        let newCard = {};

        newCard.Front = frontAdd;
        newCard.Back = backAdd;
        cardList.push(newCard);
        axios.post(`${process.env.REACT_APP_BASE_URL}/card/new?email=${encodeURIComponent(email)}&deck=${deck}`, { Front: frontAdd, Back: backAdd })
        setFrontAdd('');
        setBackAdd('');
    };

    //handles the events that happen when the Cancel button is clicked
    const handleAddCancelBtn = (e) => {
        document.getElementById("add-card-box").style.display='none';
        setFrontAdd('');
        setBackAdd('');
    };

    //handles the events in the edit card box
    const [frontEdit, setFrontEdit] = useState('');
    const [backEdit, setBackEdit] = useState('');
    const [submittedEdit, setSubmittedEdit] = useState(false);

    // Handling the change to front text of edit card
    const handleFrontEdit = (e) => {
        setFrontEdit(e.target.value);
            setSubmittedEdit(false);
        };

    // Handling the change to back text of edit card
    const handleBackEdit = (e) => {
        setBackEdit(e.target.value);
            setSubmittedEdit(false);
        };

    //handles the events that happen when the update button is clicked
    const handleUpdateBtn = (e) => {
      let cardEdited = {};

      cardEdited.front = frontEdit;
      cardEdited.back = backEdit;
      
      const newCardList = cardList;
      newCardList.splice(index,1,cardEdited);
      setCardList(newCardList);

        axios.post(`${process.env.REACT_APP_BASE_URL}/card/update?email=${encodeURIComponent(email)}&deck=${deck}&index=${index}`, { Front: frontEdit, Back: backEdit }).then((response) => { })

      document.getElementById("edit-card-box").style.display='none';
      setFrontEdit('');
      setBackEdit('');
    };

    //handles the events that happen when the Cancel button is clicked
    const handleEditCancelBtn = (e) => {
        document.getElementById("edit-card-box").style.display='none';
        setFrontEdit('');
        setBackEdit('');
    };


    //where all the page style and structure is.
    if (cardList.length === 0) {
    return (
        <>
		<Navbar />
        <header>
        <div className="container">
            <div className="nav1">
                <h9>Flash Cards</h9>
                <div>
                    <button role="addBtn" onClick={handleAddBtn}>Add Card</button>
                    <button role="edit" onClick={handleEditBtn} >Edit</button>
                    <button role="delete" onClick={handleDeleteBtn}>Delete</button>
                </div>
            </div>
        </div>
    </header> 

    <div className="emptyContainer">
        <div className="cardBoxEmpty">Deck empty add cards</div>
    </div>

    <div className="addContainer">
        <div className="cardBox" id="add-card-box" data-testid="add-card-box">
            <h8>New Flash Card</h8>
            <div className="textAreas">
                <textarea 
                    className="frontAdd" 
                    id="add-front-text" 
                    style={{textAlign:"center"}}
                    placeholder="Enter front side here" 
                    value={frontAdd}
                    onChange={handleFrontAdd}>
                </textarea>
                <textarea 
                    className="backAdd" 
                    id="add-back=text" 
                    style={{textAlign:"center"}}
                    placeholder="Enter back side here"
                    value={backAdd}
                    onChange={handleBackAdd}>
                </textarea>
            </div>
            <div className="cardButtons">
                <button className="saveBtn" onClick={handleSaveBtn}>Save</button>
                <button className="cancelBtn" onClick={handleAddCancelBtn}>Cancel</button>
            </div>
        </div>
    </div>
    </>
    );
    }

    else {
        return (
            <>
                    <Navbar />
					<header>
                    <div className="container">
                        <div className="nav1">
                            <h9>Flash Cards</h9>
                            <div>
                                <button role="addBtn" onClick={handleAddBtn}>Add Card</button>
                                <button role="edit" onClick={handleEditBtn}>Edit</button>
                                <button role="delete" onClick={handleDeleteBtn}>Delete</button>
                            </div>
                        </div>
                    </div>
                </header>
        
                <div className="addContainer">
                    <div className="cardBox" id="add-card-box">
                        <h8>New Flash Card</h8>
                        <div className="textAreas">
                            <textarea 
                                className="frontAdd" 
                                id="add-front-text" 
                                style={{textAlign:"center"}}
                                placeholder="Enter front side here" 
                                value={frontAdd}
                                onChange={handleFrontAdd}>
                            </textarea>
                            <textarea 
                                className="backAdd" 
                                id="add-back=text" 
                                style={{textAlign:"center"}}
                                placeholder="Enter back side here"
                                value={backAdd}
                                onChange={handleBackAdd}>
                            </textarea>
                        </div>
                        <div className="cardButtons">
                            <button className="saveBtn" onClick={handleSaveBtn}>Save</button>
                            <button className="cancelBtn" onClick={handleAddCancelBtn}>Cancel</button>
                        </div>
                    </div>
                </div>
        
                <div className="editContainer">
                    <div className="cardBox" id="edit-card-box" display="none">
                        <h8>Edit Flash Card</h8>
                        <div className="textAreas">
                            <textarea 
                                className="frontEdit" 
                                id="edit-front-text" 
                                style={{textAlign:"center"}}
                                placeholder="Enter front side here"
                                value={frontEdit}
                                onChange={handleFrontEdit}>
                            </textarea>
                            <textarea 
                                className="backEdit" 
                                id="edit-back-text" 
                                style={{textAlign:"center"}}
                                placeholder="Enter back side here"
                                value={backEdit}
                                onChange={handleBackEdit}>
                                
                            </textarea>
                        </div>
                        <div className="cardButtons">
                            <button className="updateBtn" onClick={handleUpdateBtn}>Update</button>
                            <button className="cancelBtn" onClick={handleEditCancelBtn}>Cancel</button>
                        </div>
                    </div>
                </div>
        
                
        
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
                                readOnly={true}
                                placeholder="Front Text"
                                value={cardList[index].Front} />
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
                                readOnly={true}
                                placeholder="Back Text"
                                value={cardList[index].Back} /><br />
                        </form>
        
                    </div>
                </ReactCardFlip>
                        <div className="cardNavBtn">
                            <button role="prev" onClick={handlePrevBtn}>Previous</button>
                            <button role="flip" onClick={handleClick}>Flip</button>
                            <button role="next" onClick={handleNextBtn}>Next</button>
                        </div>
                </>
            );
    }

}

export default FlashCardView;
