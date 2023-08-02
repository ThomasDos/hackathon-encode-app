/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'primary-grey': '#F6F4EB',
        'primary-light-blue': '#91C8E4',
        'primary-blue': '#749BC2',
        'primary-dark-blue': '#4682A9'
      },
      backgroundColor: {
        'primary-grey': '#F6F4EB',
        'primary-light-blue': '#91C8E4',
        'primary-blue': '#749BC2',
        'primary-dark-blue': '#4682A9'
      },
      borderColor: {
        'primary-grey': '#F6F4EB',
        'primary-light-blue': '#91C8E4',
        'primary-blue': '#749BC2',
        'primary-dark-blue': '#4682A9'
      }
    }
  },
  plugins: []
}
