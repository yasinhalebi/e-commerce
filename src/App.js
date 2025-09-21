import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PaymentFormPage from './components/PaymentFormPage';
import { useState } from 'react';
import ProductDetail from './components/ProductDetail';
import ConfirmationPage from './components/ConfirmationPage';

function App() {
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState({});
  const handleAddToCart = (product) => {
  setCartItems(prevItems => {
    const existingItem = prevItems.find(item => item.id === product.id);
    if (existingItem) {
      return prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prevItems, { ...product, quantity: 1 }];
  });
};

  return (
      <Router>
        <Header setSelectedHeaderCategory={setSelectedCategory} total={total}/>
        <div className='pt-4'>
          <Routes>
              <Route path="/" element={<HomePage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} cartItems={cartItems} setCartItems={setCartItems} setProduct={setProduct} total={setTotal}/>} />
              <Route path="/payment" element={<PaymentFormPage items={cartItems} setItems={setCartItems}/>} />
              <Route path="/productDetail" element={<ProductDetail total={setTotal} product={product} setCartItems={setCartItems} cartItems={cartItems} onAddToCart={handleAddToCart} setProduct={setProduct}/>} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </div>
        <footer className="bg-white shadow-md mt-8 w-full bottom-0">
          <div className="container mx-auto px-4 py-4 text-center text-gray-600">
            © 2025 بيت الجملة. جميع الحقوق محفوظة
          </div>
        </footer>
      </Router>
  );
}

export default App;
