import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./navbar"
import Home from './Home';
//import Login from './Login';

function App() {
  return (
    <Router>
		<Navbar />
		<Routes>
		  <Route exact path="/" element={<Home />}/>
		</Routes>
	</Router> 
  );
}

export default App;
