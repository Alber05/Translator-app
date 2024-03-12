/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['DM Sans', 'sans-serif']
      },
      backgroundImage: {
        hero: 'linear-gradient(to top, rgba(18, 24, 38, 1) 40%, rgba(33, 41, 54, 0.1) 100%), url("/src/assets/hero_img.jpg")'
      },
      colors: {
        'custom-040711': '#040711',
        'custom-394150': '#394150',
        'custom-4D5562': '#4D5562',
        'custom-CDD5E0': '#CDD5E0',
        'custom-F9FAFB': '#F9FAFB',
        'custom-3662E3': '#3662E3',
        'custom-7CA9F3': '#7CA9F3',
        'custom-212936cc': '#212936cc',
        'custom-121826cc': '#121826cc'
      }
    }
  },
  plugins: []
}
