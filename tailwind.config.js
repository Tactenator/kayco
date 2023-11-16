/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    './**.{html,js}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'background': '#fafafa'
      },
      colors: {
        'text': '#260d0d',
        'background': '#fafafa',
        'primary': '#205b5b',
        'secondary': '#eee6e2',
        'accent': '#42bd80',
       }
    },
  },
  plugins: [],
}