import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import FlashCardView from './FlashCardView';

function App() {
  return (
    <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/FlashCardView" element={<FlashCardView/>}/>
            </Routes>
          </div>
        </div>
    </Router> 
  );
}

export default App;

