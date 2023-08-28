import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import FooterMenu from './components/footer-menu';
import Header from './components/header';
import Home from './content/pages/home/Home';
import Pay from './content/pages/store/ pay';

function App() {

  const [allProducts, setAllproducts] = useState(() => {
    const saveEquipos = window.localStorage.getItem("allProducts");
    if (saveEquipos) {
      return JSON.parse(saveEquipos);
    } else {
      return []
    }
  });

  useEffect(() => {
    window.localStorage.setItem("allProducts", JSON.stringify(allProducts))
  }, [allProducts])

  const [total, setTotal] = useState(() => {
    const total = window.localStorage.getItem("total");
    if (total) {
      return JSON.parse(total);
    } else {
      return []
    }
  });

  useEffect(() => {
    window.localStorage.setItem("total", JSON.stringify(total))
  }, [total]);


  const [countProducts, setCountProducts] = useState(() => {
    const countProducts = window.localStorage.getItem("countProducts");
    if (countProducts) {
      return JSON.parse(countProducts);
    } else {
      return []
    }
  });

  useEffect(() => {
    window.localStorage.setItem("countProducts", JSON.stringify(countProducts))
  }, [countProducts])


  return (
    <>
      <div className="App">
        <Router>
          <header className="App-header">
            <Header
              allProducts={allProducts}
              setAllproducts={setAllproducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          </header>
          <Routes>
            <Route path='/' element={
              <Home
                allProducts={allProducts}
                setAllproducts={setAllproducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts} />
            } />
            <Route path='/pay' element={<Pay  total={total} setAllproducts={setAllproducts}  setTotal={setTotal}   setCountProducts={setCountProducts} />} />
          </Routes>
          <FooterMenu />
        </Router>
      </div>
    </>
  );
}

export default App;
