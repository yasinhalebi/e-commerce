import React, { useState, useEffect } from 'react';
import { FaShoppingCart} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function PaymentFormPage({items, setItems}) {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // Total excluding items with name containing "خبز"
  const totalWithoutBread = items
    .filter(item => !item.name.includes("خبز"))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    notes: '',
    area: 'default',
    hour: 'default'
  });

  const handleQuantityChange = (id, change) => {
      setItems(
        items.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
      );
    };

  const minimumOrder = 250;
  // Delivery fee logic based on totalWithoutBread
  const deliveryFee = totalWithoutBread >= minimumOrder ? 0 :
    (formData.area === 'İnegöl' ? 20 : (['Alanyurt', 'Toki', 'Yenice'].includes(formData.area) ? 40 : 0));

  const isOrderValid = total >= minimumOrder;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      alert('يرجى تعبئة جميع الحقول المطلوبة.');
      return;
    }

    const itemsList = items
      .map((item) => `- ${item.name}: ${item.quantity} × ${item.price} = ${item.quantity * item.price} ريال`)
      .join('\n');

    const message = `طلب جديد من: ${formData.name}\n` +
               `العنوان: ${formData.address}\n` +
               `المنطقة: ${formData.area}\n` +
               `رقم الهاتف: ${formData.phone}\n` +
               `المنتجات:\n${itemsList}\n` +
               `اجمالي المنتجات:\n${total}\n` +
               `أجرة التوصيل:\n${deliveryFee}\n` +
               `الإجمالي الكلي: ${total + deliveryFee} ليرة\n` +
               `ملاحظات: ${formData.notes || 'لا توجد ملاحظات'}`;
                   
    const whatsappUrl = `https://wa.me/+905346208977?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    navigate('/confirmation');
  };
  return (
    <div className="h-min-screen container mx-auto p-8 md:flex md:flex-row justify-between">
      <div className="md:basis-[30%] bg-white p-4 shadow-md rounded overflow-y-auto md:h-full mb-8">
        <h2 className="text-xl font-bold mb-4 flex flex-row items-center">Shopping Cart <span className="text-blue-500 ml-2">🛒</span></h2>
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex flex-col py-3 border-b">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => setItems(items.filter(i => i.id !== item.id))}
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center border rounded">
                  <button className="px-3 py-1 border-r hover:bg-gray-50"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button className="px-3 py-1 border-l hover:bg-gray-50"
                  onClick={() => handleQuantityChange(item.id, +1)}
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-900 font-medium">₺{item.price}</p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <div className="flex justify-between font-bold text-lg py-1 border-t">
              <span>Total:</span>
              <span>₺{total}</span>
            </div>
            <div className="flex justify-between font-bold text-lg py-1">
              <span>Total (without bread):</span>
              <span>₺{totalWithoutBread}</span>
            </div>
            <div className="flex justify-between font-bold text-lg py-1">
              <span>Delivery Fee:</span>
              <span>₺{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg py-3 border-t">
              <span>Total to Pay:</span>
              <span>₺{total + deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>

      
      
        <form onSubmit={handleSubmit} className="md:basis-[60%] bg-white px-8 pt-6 pb-8 mb-4 md:h-full">
          <div className="mb-6 border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">How is the total calculated?</h3>
            <ul className="list-disc pl-6 text-gray-600 text-sm">
              <li>
                <strong>Distribution starts at 12:00 PM and 16:00 PM every day</strong>
              </li>
              <li>
                <strong>If your order exceeds 500 lira, it will be processed immediately </strong>without waiting until 12:00.
              </li>
              <li>
                <strong>Subtotal</strong>: Calculated based on the price of each product multiplied by the selected quantity.
              </li>
              <li>
                <strong>Minimum Order</strong>: The minimum order is 200 lira to qualify for free delivery within İnegöl and its suburbs.
              </li>
              <li>
                <strong className='text-red-600 text-lg'>Delivery Fee</strong>:
                <ul className="list-circle pl-4">
                  <li className='flex bg-red-400 text-white font-medium md:w-max m-1 px-2'>If subtotal is less than 200 lira:</li>
                  <li className='flex bg-red-400 text-white font-medium md:w-max m-1 px-2'>Within İnegöl: 20 lira delivery fee.</li>
                  <li className='flex bg-red-400 text-white font-medium md:w-max m-1 px-2'>In suburbs (Alanyurt, Toki, Yenice): 40 lira delivery fee.</li>
                  <li className='flex bg-red-400 text-white font-medium md:w-max m-1 px-2'>If subtotal is 200 lira or more without bread price: Free delivery to all areas.</li>
                </ul>
              </li>
              <li>
                <strong>Total</strong>: Equals subtotal plus delivery fee (if applicable).
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Complete Payment</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />

          </div>
          <div className="mb-4 flex flex-row justify-between gap-8">
            <div className='w-full'>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className='w-full'>
                <label className="block text-gray-700 text-sm font-bold mb-2">Area:</label>
                <select
                  className={`shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  formData.area === "default" ? "text-gray-400" : "text-gray-700"
                  }`}
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                >
                  <option value="default" selected disabled>Select your area</option>
                  <option className='text-stone-700' value="İnegöl">İnegöl</option>
                  <option className='text-stone-700' value="Alanyurt">Alanyurt</option>
                  <option className='text-stone-700' value="Toki">Toki</option>
                  <option className='text-stone-700' value="Yenice">Yenice</option>
                </select>
            </div>
          </div>
          <div className="mb-4 flex flex-row justify-between gap-8">
            <div className='w-full'>
              <label className="block text-gray-700 text-sm font-bold mb-2">Notes (optional):</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter any additional notes"
                onChange={handleInputChange}
                />
            </div>
                <div className='w-full'>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Time:</label>
                  <select
                    className={`shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    formData.hour === "default" ? "text-gray-400" : "text-gray-700"
                    }`}
                    name="hour"
                    value={formData.hour}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="default" selected disabled>Select delivery time</option>
                    <option className='text-stone-700' value="12:00">12:00 PM</option>
                    <option className='text-stone-700' value="16:00">4:00 PM</option>
                    <option className='text-stone-700' value="21:00">9:00 PM</option>
                  </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
            Complete Payment
          </button>
        </form>
      
    </div>
  );
}