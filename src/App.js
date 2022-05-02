import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FreeResponse from './FreeResponse';
import FlashCardView from './FlashCardView';
import Navbar from "./navbar"
import Matching from './Matching';
import Graph from './Graph';
import Home from './Home';
import Login from './Login';


function App() {
  return (
    <Router>
		<Navbar />
		<Routes>
			<Route exact path="/" element={<Home />}/>
			<Route path="/login" element={<Login />} />
			<Route path="/view" element={<FlashCardView />} />
			<Route path="/freeResponse" element={<FreeResponse />} />
			<Route path="/matching" element={<Matching />}/>
			<Route path="/graph" element={<Graph />}/>
		</Routes>
	</Router> 
  );
}

export default App;
