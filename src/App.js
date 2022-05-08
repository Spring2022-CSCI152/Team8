import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState } from 'react';
import FreeResponse from './FreeResponse';
import FlashCardView from './FlashCardView';
import Navbar from "./navbar"
import Matching from './Matching';
import Graph from './Graph';
import Home from './Home';
import Login from './Login';


function App() {
  const [showNav, setShowNav] = useState(true);
	
  return (
    <Router>
		{   showNav &&
          <nav>
            <Navbar />
          </nav>
		} 
		<Routes>
			<Route exact path="/" element={<Home />}/>
			<Route index path="/login" element={<Login funcNav={setShowNav}/>}/>
			<Route path="/view" element={<FlashCardView />} />
			<Route path="/freeResponse" element={<FreeResponse />} />
			<Route path="/matching" element={<Matching />}/>
			<Route path="/graph" element={<Graph />}/>
		</Routes>
	</Router> 
  );
}

export default App;

