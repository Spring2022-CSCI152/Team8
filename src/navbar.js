import React from 'react';
import {  Link } from "react-router-dom";
import {FaHome} from "react-icons/fa";
import "./Home.css";
const Navbar = () =>{
	
  const handleLogOut = () => {
	  localStorage.removeItem('email');
  }
  return (
    <nav className="navbar">
		<div className="links">
		<a href="/" data-testid="homelink"><FaHome size={50}/></a>
		<a href="/Login" onClick = {handleLogOut}><b>Log out</b></a>
		</div>
	</nav>
  );
}
export default Navbar;