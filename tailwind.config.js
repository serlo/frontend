const { tint, lighten } = require('polished')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

// base colors
const brand = '#007ec1'
const brandGreen = '#95bc1a'
const yellow = '#ffbe5e'

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './tailwind.config.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: brand,
          light: tint(0.3, brand), // <- lightBlue
          lighter: tint(0.55, brand), // <- lighterBlue
          150: tint(0.85, brand), // <-lightBlueBackground
          100: tint(0.94, brand), // <- bluewhite
          50: tint(0.96, brand), // <- lightBackground
        },
        brandgreen: {
          DEFAULT: brandGreen,
          light: lighten(0.35, brandGreen),
          lighter: lighten(0.45, brandGreen),
        },
        truegray: colors.trueGray,
        berry: '#857189',
        newgreen: '#2fceb1',
        yellow: {
          DEFAULT: yellow,
          200: tint(0.75, yellow),
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
        menu: 'rgba(0, 0, 0, 0.2) 0px 2px 4px;',
      },
      fontFamily: {
        serlo: 'Karmilla, sans-serif',
        handwritten: 'Caveat, sans-serif',
      },
      backgroundImage: {
        'circled-and-arrow':
          "url('/_assets/img/landing/circled_and_arrow.svg')",
        underlined: "url('/_assets/img/landing/underlined.svg')",
        wiggle: "url('/_assets/img/landing/wiggle.svg')",
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
      sm: '800px',
      md: '1024px',
      lg: '1216px',
      print: { raw: 'print' },
    },
  },
  variants: {
    extend: {
      margin: ['first'],
    },
  },
  plugins: [
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
        '.special-hyphens-auto': {
          hyphens: 'auto',
        },
      })

      // add classes of serlo-components to autocomplete
      addComponents(extractCSSClasses())
    }),
  ],
}

function extractCSSClasses() {
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
}
