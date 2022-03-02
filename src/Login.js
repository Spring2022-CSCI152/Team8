
import React, {useState} from "react";
import ReactCardFlip from 'react-card-flip';
import axios from "axios";

const Login = props => {
	const [isFlipped, setIsFlipped] = useState(false);
	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};
	
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
	const handleCPassword = (e) => {
	setCPassword(e.target.value);
	setSubmitted(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '' || password !== confirmPass) {
			setError(true);
		} 
		else {
			setSubmitted(true);
			setError(false);
			setIsFlipped(!isFlipped);
		}
		const registered = {
			email: email,
			password: password
		}
		axios.post(/*Server link here*/, registered).then((response) => {
            console.log(response.data)
            window.location = '/login';
        }).catch((res)=>{
            this.setState({...this.state, error: res.response.data.password}, console.log(this.state))
        })
	};
	const handleSubmitL = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setError(true);
		} 
		else {
			setSubmitted(true);
			setError(false);
			window.location = '/';
		}
	};
	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{display: submitted ? '' : 'none',}}>
				<h3>User successfully registered!!</h3>
			</div>
		);
	};
	const errorMessage = () => {
		return (
			
			<div
			className="error"
			style={{display: error ? '' : 'none',}}>
			<h3>There's an error with the forms</h3>
			</div>
		);
	};
	
	return (
		   <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedFrontToBack="1.5" flipSpeedBackToFront="1.5" containerStyle={{maxWidth: 1080, margin: 0, margin: "auto"}}>
			<div style={{
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
				<button className="btn" type="submit" onClick={handleSubmit}>Signup</button>
				<button onClick={handleClick} >Already have an account?</button>
			</div>
			 <div style={{
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
				<button className="btn" type="submit" onClick={handleSubmitL}>Login</button>
				<button onClick={handleClick}>Don't have an account?</button>
			</div>
		  </ReactCardFlip>	  
	);
}

export default Login;