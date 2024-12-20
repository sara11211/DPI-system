module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0F60FF', 
        'black': '#23272E', 
        'accent-blue': '#F4F7FE', 
        'dark-gray': '8B909A',
        'background-gray': 'FAFAFA',
        'white' : 'FFFFFF',
      },
      fontFamily: {
        'main': ['Public Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
