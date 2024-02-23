// This tailwind preset is also used in https://github.com/serlo/serlo-editor-for-edusharing.
// Using a tailwind preset like this allows sharing the configuration between multiple repos.

import * as fs from 'fs'
import * as path from 'path'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'
import tailwindAnimate from 'tailwindcss-animate'

// base colors
const brand = '#007ec1'
const brandGreen = '#95bc1a'
const sunflower = '#ffbe5e'
const sunflowerColors = {
  DEFAULT: sunflower,
  300: sunflower,
  200: '#ffdaa3',
  100: '#fff1db',
  50: '#fff9f0',
}
const newGreen = '#2fceb1'

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: brand,
          50: '#f4f9fc',
          100: '#eff7fb',
          150: '#e6f2f9',
          200: '#d9ebf5',
          300: '#bbdced',
          400: '#8ec5e2',
          500: '#51a5d1',
          600: brand,
          700: '#0076b9', // slighly darker brand blue for better color contrast with white (for smaller text) and light blue.
        },
        brandgreen: {
          DEFAULT: brandGreen,
          50: '#edfac5',
          100: '#ddf299',
          200: '#cfed6d',
          300: '#b9d957',
          400: '#9fc91c',
          500: brandGreen,
          // 600: '#81a317',
          // 700: '#6d8a13',
          // 800: '#5b7310',
          // 900: '#45570c',
          muted: '#cfe097',
        },
        newgreen: {
          DEFAULT: newGreen,
          600: '#6cddc9',
          700: newGreen,
        },
        gray: colors.neutral,
        berry: '#857189',
        'editor-primary': sunflowerColors,
        'almost-black': '#404040',
        yellow: sunflowerColors,
        orange: {
          DEFAULT: colors.orange[900],
          200: colors.orange[200],
          50: colors.orange[50],
        },
        red: {
          DEFAULT: colors.red[900],
          100: colors.red[100],
        },
      },
      borderWidth: {
        3: '3px',
        6: '6px',
      },
      letterSpacing: {
        'slightestly-tighter': '-0.006em',
        'slightly-tighter': '-0.012em',
      },
      animation: {
        'spin-fast': 'spin 400ms linear infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
      borderRadius: {
        '4xl': '4rem',
      },
      lineHeight: {
        browser: 'normal',
        cozy: '1.33',
      },
      margin: {
        block: '30px',
        '15vh': '15vh',
      },
      padding: {
        block: '30px',
        '2/3': '66%',
        '6/5': '120%',
      },
      spacing: {
        0.25: '1px',
        2.25: '9px',
        side: '16px',
        'side-lg': '40px',
      },
      minWidth: {
        180: '180px',
      },
      outline: {
        gray: '1px dotted #212121',
      },
      boxShadow: {
        brand: `0 0 10px ${brand}, 0 0 5px ${brand}`,
        menu: 'rgba(0, 0, 0, 0.2) 0px 2px 4px',
        modal: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
        input: `0 0 4px 0 ${brand}`,
      },
      fontFamily: {
        serlo: 'Karla, sans-serif',
        handwritten: 'Caveat, sans-serif',
      },
      backgroundImage: {
        'circled-and-arrow':
          "url('/_assets/img/landing/circled_and_arrow.svg')",
        underlined: "url('/_assets/img/landing/underlined.svg')",
        'underlined-simple': "url('/_assets/img/landing/simple-underline.svg')",
        wiggle: "url('/_assets/img/landing/wiggle.svg')",
        orangeBow: "url('/_assets/img/landing/about-container.svg')",
        blueWave: "url('/_assets/img/landing/footer-container.svg')",
        topWaveFromWhite: "url('/_assets/img/landing/top-wave.svg')",
      },
      backgroundSize: {
        '100%': '100% 100%',
      },
      minHeight: {
        8: '32px',
        '1/2': '50vh',
        '1/4': '25vh',
      },
      maxWidth: {
        xs: '300px',
        65: '260px',
        '30p': '30%',
      },
      fontSize: {
        'base-plus': ['1.1875rem', '1.22'],
        '1.5xl': ['1.3125rem', '1.22'],
        '2.5xl': ['1.7rem', '1.22'],
        '3.5xl': ['2rem', '1.22'],
      },
      width: {
        '1/8v': '12.5vw',
        '1/4v': '25vw',
        '1/3v': '33vw',
      },
      height: {
        630: '630px',
      },
      cursor: {
        'zoom-in': 'zoom-in',
      },
    },
    screens: {
      mobile: '500px',
      mobileExt: '550px',
      sm: '800px',
      md: '1024px',
      lg: '1216px',
      xl: '1300px',
      print: { raw: 'print' },
    },
  },
  plugins: [
    tailwindAnimate,
    plugin(function ({ addUtilities, addComponents }) {
      // add classes of serlo-components to autocomplete
      addComponents(extractCSSClasses())
    }),
  ],
}

function extractCSSClasses() {
  try {
    const css = fs.readFileSync(
      path.join(__dirname, '/../src/assets-webkit/styles/serlo-tailwind.css'),
      'utf-8'
    )

    const regex = /\.serlo\-[^ \:\{\n,]+/gm
    let m = ''
    const components = {}

    while ((m = regex.exec(css)) !== null) {
      // The result can be accessed through the `m`-variable.
      components[m[0]] = {}
    }

    return components
  } catch (error) {
    // don't run on client, no problem
  }
}
