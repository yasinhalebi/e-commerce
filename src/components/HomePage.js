import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import BestSellersSlider from './BestSellersSlider';
import img from "../111.jpg"
import imgMobile from "../mpbile.jpg"
import { useLocation } from 'react-router-dom';

export default function HomePage({ total, selectedCategory, setSelectedCategory, cartItems, setCartItems, setProduct }) {
  
  const location = useLocation()
  
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

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <div className='bg-green-50'>
      
      {window.innerWidth <= 768 ? 
        <div className="w-full">
          <img src={imgMobile} className="w-full"></img>
        </div> : 
        <div className="w-full">
          <img src={img} className="w-full "></img>
        </div>
      }
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Cart
              total={total}
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2 rounded shadow-sm p-4 bg-white">
            <ProductList total={total} onAddToCart={handleAddToCart} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setProduct={setProduct} items={cartItems} setCartItems={setCartItems}/>
          </div>
        </div>
      </main>
    </div>
  );
}