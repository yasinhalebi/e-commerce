import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { FaStoreAlt} from 'react-icons/fa';
import BestSellersSlider from './BestSellersSlider';



const ProductList = ({ total, onAddToCart, selectedCategory, setSelectedCategory, setProduct, items, setCartItems}) => {
  
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDropDown, SetSelectedDropDown] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(product => {
    return (selectedCategory === 'All' || selectedCategory === product.section || (selectedCategory === "Special Offers!" && product.isOnOffer))
  });

    const filteredProductsLast = filteredProducts.filter(product => {
     const productName = (product.name || '').toString().toLowerCase();
     const searchValue = (search || '').toString().toLowerCase();
     const matchesSearch = searchValue === '' || productName.includes(searchValue);
     const matchesCategory = selectedDropDown === 'All' || selectedDropDown === product.category;
     return matchesCategory && matchesSearch;

    })


  return (    
    <div className="mx-auto min-h-screen container">
      {selectedCategory === "الكل" && <div className='mb-12'>
        <BestSellersSlider  onAddToCart={onAddToCart} />
      </div>}
      <div className="container flex  mb-8 flex-col lg:flex-row lg:justify-between">
        <h2 className="text-3xl font-bold text-gray-800 lg:mb-0 mb-4 flex flex-row items-center"><FaStoreAlt className='ml-2 text-green-500 text-2xl'/>Products</h2>
        <div className="flex gap-6 ">
          
          <input type="text" placeholder="Search for a product..." className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 text-green-800 w-full" value={search} onChange={e => setSearch(e.target.value)} />
          <div className="relative" tabIndex={0} onBlur={e => {
            setTimeout(() => setCategoryOpen(false), 100);
          }}>
            <button
              className={`${selectedDropDown === "All" ? 'bg-green-600 text-white hover:bg-green-800 focus:outline-none  px-4 py-2 border border-gray-300 rounded-lg flex' : 'flex px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none'}`}
              onClick={() => setCategoryOpen((prev) => !prev)}
              type="button"
            >
              {selectedDropDown} <span className="ml-2">▼</span>
            </button>
            {categoryOpen && (
              <ul className={"absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 text-right max-h-60 overflow-y-auto"}>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={`px-4 py-2 hover:bg-green-100 cursor-pointer text-stone-700 ${selectedDropDown === cat ? 'bg-green-200 font-bold' : ''}`}
                    onMouseDown={() => { SetSelectedDropDown(cat); setCategoryOpen(false); }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProductsLast.map((product) => (
          <ProductCard bgColor={"bg-green-100"} total={total} key={product.id} product={product} onAddToCart={onAddToCart} setProduct={setProduct} items={items} setCartItems={setCartItems}/>
        ))}
      </div>
    </div>
  );
};

export default ProductList;