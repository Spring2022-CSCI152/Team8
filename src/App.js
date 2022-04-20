import Editor from './Editor'
import {Link} from 'react-router-dom'

function App() {
    return (
        <div className="app">
            <Link to="/card">
                <button>New Card</button>
            </Link>
        </div>
    );
}

export default App;
