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
        'primary': '#c24c4c',
        'secondary': '#eee6e2',
        'accent': '#a73939',
        'blurb': '#f2f2f2', 
        'link': '#2200CC'
       },
       
    },
  },
  plugins: [],
}