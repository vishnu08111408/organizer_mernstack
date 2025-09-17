/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'red': '#D80032',
      'pink': '#F78CA2',
      'lg-pink': '#ffadbe',
      'cream': '#F9DEC9',
      'maroon': '#3D0C11',
      'smt': '#ce5e50',
      'green': '#367E18',
      
    },
    extend: {
      boxShadow: {
        'my-shadow': '0 0 100px rgba(0, 0, 0, 0.3)',
        'prof-shadow': '2px 2px 6px rgba(0, 0, 0, 0.4)',
      },
      maxWidth: {
        'test': '60%',
      },
      minWidth: {
        'test': '60%',
      },
      height: {
        'card': '20rem',
      },
      width: {
        'home': '62.5%',
        'htext': '37.5%',
        'card': '40rem',
      },
      screens: {
        'navBr': '992px',
        'navBrM': {'max': '992px'},
        // 'exp': {'max': '1266px'},
        // 'dbBr': '830px',
        // 'dbBrM': {'max':'860px'},
        // 'tab': '580px',
        // 'tabM': {'max': '580px'},
        // 'mob': '500px',
        // 'mobM': {'max': '500px'},
        // 'engcard': {'max': '1200px'},
        // 'engtab': '900px',
        // 'engtabM': {'max': '900px'},
        // 'engph': '720px',
        // 'engphM': {'max': '720px'},
        // 'side': {'max': '1190px'},
        // 'pfr': {'max': '615px'},
      },
    },
  },
  plugins: [],
}

