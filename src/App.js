import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import FlashCardView from './FlashCardView';
import FreeResponse from './FreeResponse';

function App() {
  return (
    <Router>
		<div className="App">
		  <div className="content">
			<Routes>
			  <Route path="/login" element={<Login />}/>
			  <Route path="/FlashCardView" element={<FlashCardView/>}/>
			  <Route path="/FreeResponse" element={<FreeResponse/>}/>
			</Routes>
		  </div>
		</div>
	</Router> 
  );
}

export default App;
