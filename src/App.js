import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import './App.css';
import bgImage from './assets/bg-image.png';

function App() {
  React.useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
  }, []);
  
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Cart />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:barcode" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
