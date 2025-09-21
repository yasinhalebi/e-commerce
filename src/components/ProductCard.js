import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, setProduct, items, setCartItems, bgColor, total}) => {
  const isOnOffer = product.isOnOffer ? "md:text-xs text-[4px] font-bold text-white bg-red-500 p-1 rounded" : "text-xs font-bold text-white bg-red-500 p-1 rounded hidden";
  const navigate = useNavigate();
  const cardClassName = bgColor === "bg-green-100" ? "cursor-pointer rounded-lg hover:shadow-2xl transition-shadow duration-200 bg-green-100 hover:bg-green-200" : "cursor-pointer rounded-lg hover:shadow-2xl transition-shadow duration-200 bg-red-100 hover:bg-red-200"
  return (
    <div 
      className={cardClassName}
      onClick={() => { setProduct(product); navigate("/productDetail", { state: { product } }); }}
    >
      <div className="mb-4 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-t " />
      </div>
      <div className='px-4 pb-4'>
      <div className="mb-4 flex justify-between items-start items-center">
        <div>
          <span className="text-gray-600 text-sm">{product.category}</span>
          <h3 className="md:h-[32px] text-lg font-bold text-gray-900 h-[40px] md:h-[24px]">{product.name}</h3>
        </div>
        {product.isOnOffer && (<p className="line-through md:text-base text-[8px] text-stone-600">{product.discountPrice}</p>)}
      </div>
      <div className="mb-4 flex flex-row justify-between items-center">
        <p className="text-lg font-semibold text-gray-800">₺{product.price} <span className='text-xs font-bold'>Turkish Lira</span></p>
        <p className={isOnOffer}>Special Offer</p>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onAddToCart(product); }}
        className="w-full bg-green-800 text-white py-2 px-4 border-gray-300 rounded hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2 hover:shadow-md text-[8px] md:text-[14px]"
      >
        <span>Add to Cart</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 16M17 13L14.7 16M4.7 16H14.7M4.7 16L3 18H15.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
