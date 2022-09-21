import logo from './logo.svg';
import './App.css';
import Card from './components/card/Card';

function App() {
  return (
    <div className="App">
      <div className="card-container">
        <Card cardType="Borrow" value="test" />
      </div>
    </div>
  );
}

export default App;
