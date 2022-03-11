import { getCards } from '../database'
function App() {
    function newCard() {
        getCards().insertOne({ title: "foo" });
    }
    return (
        <div className="app">
            <button onClick={newCard}>New Card</button>
        </div>
    );
}

export default App;
