import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./navbar"
import Matching from './Matching';
{/*import Home from './Home';*/}
{/*import Login from './Login';*/}


function App() {
  return (
    <Router>
		<Navbar />
		<Routes>
		  {/*<Route exact path="/" element={<Home />}/>*/}
			  {/*<Route path="/login" element={<Login />}*/}
			  <Route path="/matching" element={<Matching />}/>
		</Routes>
	</Router> 
  );
}

export default App;