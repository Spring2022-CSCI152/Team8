import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Editor from './Editor'
import {Link} from 'react-router-dom'

function App() {
  return (
    <Router>
		<div className="App">
		  <div className="content">
				  <Routes>
		  <Route exact path="/" element={<Home />}/>
		  <Route path="/login" element={<Login />}/>
			</Routes>
		  </div>
		</div>
	</Router> 
  );
}

export default App;
