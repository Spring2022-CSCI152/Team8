import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./navbar"
import Graph from './Graph';
{/*import Matching from './Matching';*/}
{/*import Home from './Home';*/}
{/*import Login from './Login';*/}


function App() {
  return (
    <Router>
		<Navbar />
		<Routes>
		  {/*<Route exact path="/" element={<Home />}/>*/}
			  {/*<Route path="/login" element={<Login />}*/}
				  {/*<Route path="/matching" element={<Matching />}/>*/}
				  <Route path="/graph" element={<Graph />}/>
		</Routes>
	</Router> 
  );
}

export default App;