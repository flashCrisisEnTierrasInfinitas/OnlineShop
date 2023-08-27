import React, { useState, useEffect } from 'react'
import './App.css';
import Footer from './components/Footer';
import FooterMenu from './components/footer-menu';
import Header from './components/header';
import Home from './content/pages/home/Home';
import { CFooter, CLink } from '@coreui/react';

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

  const [total, setTotal] = useState(0);
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

  console.log(allProducts)

  return (
    <>
      <div className="App">
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
        <Home
          allProducts={allProducts}
          setAllproducts={setAllproducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts} />
        <FooterMenu />
      </div>
    </>
  );
}

export default App;
