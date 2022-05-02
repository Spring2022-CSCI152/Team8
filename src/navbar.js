import React from 'react';
import {  Link } from "react-router-dom";
import {FaHome} from "react-icons/fa";
import "./Home.css";
const Navbar = () =>{
  return (
    <nav className="navbar">
		<div className="links">
		<a href="/"><FaHome size={50}/></a>
		<a href="/Login"><b>Log out</b></a>
		</div>
	</nav>
  );
}
export default Navbar;