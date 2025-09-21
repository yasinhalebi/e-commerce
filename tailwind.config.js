/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],

  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
  
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        secondary: '#F5F6F5',
        accent: '#FDD835',
        neutral: '#FFFFFF',
        text: '#212121',
      },
    },
  },
  plugins: [],
  
  
}

