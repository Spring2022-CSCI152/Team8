import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FreeResponse from './FreeResponse';
import FlashCardView from './FlashCardView';
import Navbar from "./navbar"
import Home from './Home';
import Login from './Login'


function App() {
  return (
    <Router>
        <div className="App">
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/FreeResponse" element={<FreeResponse/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/FlashCardView" element={<FlashCardView/>}/>
                </Routes>
            </div>
        </div>
    </Router> 
  );
}

export default App;
