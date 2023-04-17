const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

// base colors
const brand = '#007ec1'
const brandGreen = '#95bc1a'
const yellow = '#ffbe5e'

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './tailwind.config.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: brand,
          50: '#F4F9FC',
          100: '#EFF7FB',
          150: '#E6F2F9',
          200: '#D9EBF5',
          300: '#BBDCED',
          400: '#8EC5E2',
          500: '#51A5D1',
          600: brand,
          700: '#0076b9', // slighly darker brand blue for better color contrast with white (for smaller text) and light blue.
        },
        brandgreen: {
          DEFAULT: brandGreen,
          50: '#EDFAC5',
          100: '#DDF299',
          200: '#CFED6D',
          300: '#B9D957',
          400: '#9FC91C',
          500: brandGreen,
          // 600: '#81A317',
          // 700: '#6D8A13',
          // 800: '#5B7310',
          // 900: '#45570C',
          muted: '#cfe097',
        },
        truegray: colors.neutral,
        berry: '#857189',
        newgreen: '#2fceb1',
        yellow: {
          DEFAULT: yellow,
          200: '#FFEED7',
        },
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
        serlo: 'Karmilla, sans-serif',
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
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities, addComponents }) {
      // Custom utilities all start with `special-*`
      // They use css that is not covered by tailwind
      addUtilities({
        '.special-border-half-transparent': {
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
        },
        '.special-reset-list-counter': {
          'counter-reset': 'list-counter',
        },
        '.special-content-list-counter': {
          content: 'counter(list-counter)',
        },
        '.special-increment-list-counter': {
          'counter-increment': 'list-counter',
        },
        '.special-content-space': {
          content: '" "',
        },
        '.special-content-gt': {
          content: '">"',
        },
        '.special-hyphens-auto': {
          hyphens: 'auto',
        },
        '.special-hyphens-initial': {
          hyphens: 'initial',
        },
        'special-no-page-breaks-inside': {
          'page-break-inside': 'avoid',
        },
      })

      // add classes of serlo-components to autocomplete
      addComponents(extractCSSClasses())
    }),
  ],
}

function extractCSSClasses() {
  try {
    const css = require('fs').readFileSync(
      require('path').join(
        __dirname,
        '/src/assets-webkit/styles/serlo-tailwind.css'
      ),
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
