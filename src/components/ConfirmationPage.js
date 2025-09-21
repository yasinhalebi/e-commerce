import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => (
  <div className="container mx-auto p-8 text-center h-screen">
    <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
    <h2 className="text-2xl font-bold mb-4">Your Order Has Been Sent!</h2>
    <p className="text-gray-600 mb-6">
      Thank you for shopping at Wholesale House. Click "Send" in WhatsApp to confirm your order, and we'll be in touch soon.
    </p>
    <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
      Back to Products
    </Link>
  </div>
);
export default ConfirmationPage;