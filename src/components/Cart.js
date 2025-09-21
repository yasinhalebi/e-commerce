import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart} from 'react-icons/fa';


const Cart = ({ items, onUpdateQuantity, onRemoveItem, total }) => {
  const navigate = useNavigate();
  const total1 = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  total(total1)
  const totalWithoutBread = items
    .filter(item => !item.name.toLowerCase().includes("bread"))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

    
  const deliveryThreshold = 200;
  const deliveryFee = totalWithoutBread >= deliveryThreshold ? 0 : 20;

  return (
    <div className="bg-white rounded shadow-sm p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 flex flex-row items-center">Shopping Cart <FaShoppingCart className="text-blue-500 ml-2" /></h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex flex-col py-3 border-b">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{item.name}</h3>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 border-r hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 border-l hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-900 font-medium">₺{item.price}</p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <div className="flex justify-between font-bold text-sm py-1 border-t">
              <span>Subtotal:</span>
              <span>₺{total1}</span>
            </div>
            <div className="flex justify-between font-bold text-sm py-1">
              <span>Subtotal (without bread):</span>
              <span>₺{totalWithoutBread}</span>
            </div>
            <div className="flex justify-between font-bold text-sm py-1">
              <span>Delivery Fee:</span>
              <span>₺{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg py-3 border-t">
              <span>Total:</span>
              <span>₺{total1 + deliveryFee}</span>
            </div>
            <button
              onClick={() => navigate('/payment')}
              className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
