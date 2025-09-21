import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaUtensils, FaHome } from 'react-icons/fa';
import { LuCookingPot, LuCandy } from "react-icons/lu";
import { GiChocolateBar } from "react-icons/gi";
import { MdNotificationImportant } from "react-icons/md";
import { GrCheckboxSelected } from "react-icons/gr";
import { BsCartCheckFill } from "react-icons/bs";

export default function Header({ setSelectedHeaderCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const baseClass =
    "w-[100px] text-right py-8 text-[14px] font-bold text-gray-700 hover:text-green-600  focus:outline-none flex flex-col items-center";
  const activeClass = "border-b-4 border-indigo-500";

  const navLinks = [
    { label: "Special Offers!", value: "Special Offers!" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "Cooking", value: "Cooking" },
    { label: "Snacks", value: "Snacks" },
    { label: "Essentials", value: "Essentials" },
    { label: "Ready to Eat", value: "Ready to Eat" },
    { label: "Household", value: "Household" },
    { label: "All", value: "All" },
  ];

  const iconsMap = {
    "All": <GrCheckboxSelected className="mt-2" />,
    "Breakfast": <FaUtensils className="mt-2" />,
    "Cooking": <LuCookingPot className="mt-2" />,
    "Snacks": <LuCandy className="mt-2" />,
    "Essentials": <MdNotificationImportant className="mt-2" />,
    "Ready to Eat": <FaStar className="mt-2" />,
    "Household": <FaHome className="mt-2" />,
  };

  return (
    <header className="bg-white border-b" dir="ltr" lang="en">
      <nav className="flex row mx-auto px-4 md:px-16 items-center justify-between w-full relative md:py-0 py-8">
        {/* Burger menu for mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button 
            className="ml-6 text-indigo-600 text-2xl"
            onClick={() => navigate('/payment')}
          >
            <BsCartCheckFill />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div className="relative" key={link.value}>
              <button
                className={`text-lg font-semibold focus:outline-none flex flex-row items-center ${
                  link.value === "Special Offers!"
                    ? "text-red-500 text-shadow-lg"
                    : "text-gray-700 hover:text-green-600"
                }`}
                onClick={() => {
                  navigate("/");
                  setSelectedHeaderCategory(link.value);
                  setActiveCategory(link.value);
                }}
              >
                {link.value === "Special Offers!" ? (
                  <h3 className={`${baseClass} ${
                      activeCategory === link.value ? activeClass : ""
                    } text-red-600 flex items-center gap-2`}
                    onClick={() => { navigate("/");}}>
                    Special Offers!
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.0}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456ZM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423Z"
                      />
                    </svg>
                  </h3>
                ) : (
                  <h3
                    className={`${baseClass} ${
                      activeCategory === link.value ? activeClass : ""
                    }`}
                  >
                    {link.label}
                    {iconsMap[link.value]}
                  </h3>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="absolute top-20 left-4 right-4 bg-white border rounded-lg shadow-lg z-50 flex flex-col md:hidden animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.value}
                className={`w-full text-left px-6 py-4 text-lg font-semibold text-gray-700 hover:bg-green-100 border-b last:border-b-0 focus:outline-none flex items-center justify-between`}
                onClick={() => {
                  setSelectedHeaderCategory(link.value);
                  setActiveCategory(link.value);
                  setMenuOpen(false);
                }}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {iconsMap[link.value]}
                </span>
                {link.value === "Special Offers!" ? <FaStar className="text-red-500" /> : null}
              </button>
            ))}
          </div>
        )}

        {/* Logo & Title */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => {
            navigate("/");
            setSelectedHeaderCategory("All");
            setActiveCategory("All");
          }}
        > 
          <div>
            <h1 className="text-xl font-bold text-gray-800 text-left">
              Wholesale
            </h1>
            <h1 className="text-xl font-bold text-gray-800 text-left">
              Market
            </h1>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/drh8uaeqh/image/upload/v1750354164/313314455_198693435857263_2079453457237162856_n-modified_1_jowtg9.png"
              className="w-16 h-16 ml-3 rounded-full border"
              alt="Wholesale Market Logo"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
