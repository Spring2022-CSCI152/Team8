import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <Router>
		<div className="App">
		  <div className="content">
				  <Routes>
					  <Route path="/login" element={<Login />} />
					  <Route path="/registration" element={<Login />}/>
			</Routes>
		  </div>
		</div>
	</Router> 
  );
}

export default App;
