import "./Login.css"
import React, {useState} from "react";
import ReactCardFlip from 'react-card-flip';
import axios from "axios";

//This is a functional component. It holds all the functions
//within it.
const Login = props => {
	
	//Handling the Card flip
	const [isFlipped, setIsFlipped] = useState(false);
	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};
	
	//
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setCPassword] = useState('');
	
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	
	
	// Handling the email change
	const handleEmail = (e) => {
	setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
	setPassword(e.target.value);
		setSubmitted(false);
	};
	
	//Handling the confirm password change
	const handleCPassword = (e) => {
		setCPassword(e.target.value);
		setSubmitted(false);
	};
	
	//handles the events that happen when the signup button is clicked
	const handleSignupbtn = (e) => {
		e.preventDefault();
		
		//if the fields are left blank or the password fields
		//don't match, it sets the error to true.
		if (email === '' || password === '' || password !== confirmPass) {
			setError(true);
		} 
		//Otherwise, the card is flipped and the sign up info 
		//is sent to server
		else {
			setSubmitted(true);
			setError(false);
			setIsFlipped(!isFlipped);
			const registered = {
				email: email,
				password: password
			}
			axios.post("http://localhost:80/registration", registered).then((response) => {
				console.log(response.data)
				window.location = '/login';
			}).catch((res)=>{
				this.setState({...this.state, error: res.response.data.password}, console.log(this.state))
			})
		}
	};
	
	//handles the events that happen when the Login button is clicked
	const handleLoginbtn = (e) => {
		e.preventDefault();
		
		//if the fields are left blank it sets the error to true.
		if (email === '' || password === '') {
			setError(true);
		} 
		//otherwise, the login info gets sent to server and
		//the user gets sent to the home page.
		else {
			setSubmitted(true);
			setError(false);
			window.location = '/';
		}
	};

	//function to render the error message
	const errorMessage = () => {
		return (
			
			<div
			className="error"
			style={{display: error ? '' : 'none',}}>
			<h3>There's an error with the forms</h3>
			</div>
		);
	};
	
	//where all the page style and structure is.
	return (
		   //ReactCardFlip is the container that holds
		   //the containers of the 2 card faces.
		   <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedFrontToBack="1.5" flipSpeedBackToFront="1.5" containerStyle={{maxWidth: 1080, margin: 0, margin: "auto"}}>
			
			<div style={{//style and structure of the signup side
				backgroundColor: "#EEEEEE", 
				height: 300, 
				width: 300,
				 display: "flex", 
				 justifyContent:"space-around", 
				 alignItems: "center",
				 flexDirection: "column",
				 maxWidth: 1080, margin: 0, margin: "auto",
				 }}
			>
				<h1>Signup</h1>
				<div className="messages">
				{errorMessage()}
				</div>
				<form>
					<input type="email" style={{fontSize:18}} placeholder="Email" onChange={handleEmail} value={email}/><br/>
					<input type="password" style={{fontSize:18}} placeholder="password" onChange={handlePassword} value={password}/><br/>
					<input type="password" style={{fontSize:18}} placeholder="confirm password" onChange={handleCPassword} value={confirmPass}/>
				</form>
				<button className="btn" type="submit" onClick={handleSignupbtn}>Signup</button>
				<button onClick={handleClick} >Already have an account?</button>
			</div>
			 <div style={{ //style and structure of the login side
				 backgroundColor: "#EEEEEE", 
				 height: 300, 
				 width: 300,
				 display: "flex", 
				 justifyContent:"space-around", 
				 alignItems: "center",
				 flexDirection: "column",
				 maxWidth: 1080, margin: 0, margin: "auto",
				 }}
			  >
				<h1>Login</h1>
				<div className="messages">
				{errorMessage()}
				</div>
				<form>
					<input type="email" style={{fontSize:18}} placeholder="Email" onChange={handleEmail} value={email}/><br/>
					<input type="password" style={{fontSize:18}} placeholder="password" onChange={handlePassword} value={password}/><br/>
				</form>
				<button className="btn" type="submit" onClick={handleLoginbtn}>Login</button>
				<button onClick={handleClick}>Don't have an account?</button>
			</div>
		  </ReactCardFlip>	  
	);
}

export default Login;