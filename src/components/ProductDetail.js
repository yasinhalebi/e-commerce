import React from 'react';
import Cart from './Cart';
import BestSellersSlider from './BestSellersSlider';
import { useLocation } from 'react-router-dom';

export default function ProductDetail({ product, setCartItems, cartItems, items, setProduct, onAddToCart, total }) {

    const location = useLocation()
    console.log(location.state.product.name)
    const product1 = { ...location.state.product };
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

    const handleAddToCart = () => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product1.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product1.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product1, quantity: 1 }];
        });
    };

    return (
        <main className="container mx-auto px-2 md:px-4 py-4 md:py-8 ">
            <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-10  mb-16'>
                <div className='bg-white rounded shadow-sm p-4 mt-4 md:mt-8 md:basis-[30%] w-full md:w-auto h-[500px] overflow-auto order-2 md:order-1 md:basis-2/6'>
                    <Cart
                        items={cartItems}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                        total={total}
                    />
                </div>
                
                <div className="bg-white flex flex-col md:flex-row justify-between rounded mt-4 md:mt-8 overflow-hidden md:h-[500px] border w-full md:w-auto order-1 md:order-2 md:basis-4/6" dir="ltr" lang="ar">
                    <div className="bg-green-100 basis-2/5 rounded-l shadow-stone-400 shadow-lg flex-shrink-0">
                        <img className="w-full h-full object-cover" alt={product1.name} src={product1.image} />
                    </div>
                    <div dir="rtl" className="flex flex-col justify-between basis-3/5 w-full">
                        <div className="rounded p-4 md:m-8">
                            <h7 className="font-bold">تفاصيل المنتج</h7>
                            <div className="m-2 md:m-4">
                                <h1 className="text-2xl md:text-3xl font-semibold">{product1.name}</h1>
                                <p className="text-gray-700 mb-2 md:mb-4">{product1.description}</p>
                                <p className="text-gray-500 mb-2 md:mb-4 italic">{product1.notes}</p>
                            </div>
                        </div>
                        <div className='p-2 md:p-4 md:mx-8'>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <p className="text-white font-bold rounded bg-red-600 inline-block p-1 text-xs">{product1.category}</p>
                                <p className="text-white font-bold rounded bg-green-600 inline-block p-1 text-xs">{product1.section}</p>
                            </div>
                            <p className="text-lg md:text-[26px] font-bold text-gray-900 mb-2 md:mb-4">{product1.price}₺ ليرة تركي</p>
                            <button
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
                                onClick={handleAddToCart}
                            >
                                أضف للسلة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <BestSellersSlider onAddToCart={onAddToCart} items={items} setCartItems={setCartItems}/>
            </div>
        </main>
    );
}