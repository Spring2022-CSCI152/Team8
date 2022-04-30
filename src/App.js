import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Editor from './Editor'
import {Link} from 'react-router-dom'

function App() {
  return (
    <Router>
		<div className="App">
		  <div className="content">
				  <Routes>
		  <Route path="/login" element={<Login />}/>
			</Routes>
		  </div>
		</div>
	</Router> 
  );
}

export default App;
