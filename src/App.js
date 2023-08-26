import './App.css';
import FooterMenu from './components/footer-menu';
import Header from './components/header';
import Home from './content/pages/home/Home';
import { CFooter, CLink } from '@coreui/react';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Home />
        <FooterMenu />
      </div>
    </>
  );
}

export default App;
