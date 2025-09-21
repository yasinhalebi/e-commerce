import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from '../data/products';
import Slider from "react-slick";
import { IoMdTrendingUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BestSellersSlider({ onAddToCart, items, setCartItems }) {
    const navigate = useNavigate();

    const handleProductClick = (product) => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ Scroll to top
        navigate("/productDetail", { state: { product } });
    };

    const filteredProducts = products.filter(product => product.isBestSeller);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex flex-row items-center">
                Best Sellers
                <IoMdTrendingUp className="text-red-500 text-3xl ml-4" />
            </h2>
            <Slider {...settings}>
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="cursor-pointer rounded-lg hover:shadow-2xl transition-shadow duration-200 bg-red-100 hover:bg-red-200"
                        onClick={() => handleProductClick(product)}
                    >
                        <div className="mb-4 overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-t" />
                        </div>
                        <div className='px-4 pb-4'>
                            <div className="mb-4 flex justify-between items-start">
                                <div>
                                    <span className="text-gray-600 text-sm">{product.category}</span>
                                    <h3 className="text-base font-bold text-gray-900 h-[40px] md:h-[24px]">{product.name}</h3>
                                </div>
                                {product.isOnOffer && (<p className="line-through">{product.discountPrice}</p>)}
                            </div>
                            <div className="mb-4 flex flex-row justify-between items-center">
                                <p className="text-medium md:text-lg font-semibold text-gray-800">
                                    ₺{product.price} <span className='text-[10px] font-bold text-stone-700 md:text-[12px]'>Turkish Lira</span>
                                </p>
                            </div>
                            <button
                                onClick={e => {
                                    e.stopPropagation(); 
                                    onAddToCart(product);
                                }}
                                className="w-full bg-green-800 text-white py-2 px-2 items-center border-gray-300 rounded hover:bg-green-600 transition-colors duration-200 flex items-end justify-center space-x-2 hover:shadow-md text-[8px] md:text-[14px] font-bold"
                            >
                                <span>Add to Cart</span>
                                <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 16M17 13L14.7 16M4.7 16H14.7M4.7 16L3 18H15.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
