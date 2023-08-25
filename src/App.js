import './App.css';
import Header from './components/header';
import Home from './content/pages/home/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Home />
    </div>
  );
}

export default App;
