import "./Login.css"
import React, { useState, useEffect, useContext } from "react";
import ReactCardFlip from 'react-card-flip';
import axios from "axios";

//This is a functional component. It holds all the functions
//within it.
const Login = props => {
	props.funcNav(false);
	const userList = [
		{email: "cat1", password: "dog"}, 
		{email: "cat2", password: "bird"}, 
		{email: "cat3", password: "horse"}, 
	];
	//Handling the Card flip
	const [isFlipped, setIsFlipped] = useState(false);
	const handleClick = () => {
		setError(false);
		setIsFlipped(!isFlipped);
	};

	//
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setCPassword] = useState('');
	const [user, setUser] = useState();


	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const [errorM, setMessage] = useState("");


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
			if (email === '' && password === ''){setMessage("Email and Password is blank");}
			else if (email === ''){setMessage("Email is blank");}
			else if (password === ''){setMessage("Password is blank");}
			else if (password !== confirmPass){setMessage("Password fields don't match.")}
		}
		//Otherwise, the card is flipped and the sign up info 
		//is sent to server
		else {
			setSubmitted(true);
			
			setIsFlipped(!isFlipped);
			const registered = {
				email: email,
				password: password
			}
			axios.post(`${process.env.REACT_APP_BASE_URL}/registration`, registered).then((response) => {
				if (response.data.message == "registration successful") {
					setError(false);
				}
				else {
					setError(true);
                }
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
		else {
			axios.post(`${process.env.REACT_APP_BASE_URL}/login`, { email: email, password: password }).then((response) => {
				if (response.data.message === "login successful") {
					setSubmitted(true);
					setError(false);
					localStorage.setItem("email", email)
				}
				else {
					setError(true);
				}
			}).catch((res) => {
				if (user.password === "" && user.email === "") { document.getElementById("error").innerHTML = "Must provide email. <br> Must provide password." }
				else if (user.email === "") { document.getElementById("error").innerHTML = "Must provide email." }
				else if (user.password === "") { document.getElementById("error").innerHTML = "Must provide password." }
				//console.log(res)
			})
			if (localStorage.getItem('email') !== null) {
				window.location = '/';
			}
		}
	};

	//function to render the error message
	const errorMessage = () => {
		return (

			<div className="error" style={{ display: error ? '' : 'none', }}>
				<h3>{errorM}</h3>
			</div>
		);
	};

	//where all the page style and structure is.
	return (
		//ReactCardFlip is the container that holds
		//the containers of the 2 card faces.
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedFrontToBack="1.5" flipSpeedBackToFront="1.5" containerStyle={{ maxWidth: 1080, margin: 0, margin: "auto" }}>

			<div style={{//style and structure of the signup side
				backgroundColor: "#EEEEEE",
				height: 400,
				width: 400,
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
				flexDirection: "column",
				maxWidth: 1080, margin: 0, margin: "auto",
				marginTop: 100,
			}}
			>
				<h1>Signup</h1>
				<div className="messages">
					{errorMessage()}
				</div>
				<form>
					<input type="email" style={{fontSize:18}} data-testid="S-email" placeholder="Email" onChange={handleEmail} value={email}/><br/>
					<input type="password" style={{fontSize:18}} data-testid="S-password" placeholder="password" onChange={handlePassword} value={password}/><br/>
					<input type="password" style={{fontSize:18}} data-testid="S-Cpassword" placeholder="confirm password" onChange={handleCPassword} value={confirmPass}/>
				</form>
				<button role="signUpBtn" id="logBtn" type="submit" onClick={handleSignupbtn}>Signup</button>
				<button role="loginLink" id="logBtn" onClick={handleClick} >Already have an account?</button>
			</div>
			<div style={{ //style and structure of the login side
				backgroundColor: "#EEEEEE",
				height: 400,
				width: 400,
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
				flexDirection: "column",
				maxWidth: 1080, margin: 0, margin: "auto",
				marginTop: 100,
			}}
			>
				<h1>Login</h1>
				<div className="messages">
					{errorMessage()}
				</div>
				<form>
					<input type="email" style={{fontSize:18}} data-testid="L-email" placeholder="Email" onChange={handleEmail} value={email}/><br/>
					<input type="password" style={{fontSize:18}} data-testid="L-password" placeholder="password" onChange={handlePassword} value={password}/><br/>
				</form>
				<button role="loginBtn" id="logBtn" type="submit" onClick={handleLoginbtn}>Login</button>
				<button role="signUpLink" id="logBtn" onClick={handleClick}>Don't have an account?</button>
			</div>
		</ReactCardFlip>
	);
}

export default Login;