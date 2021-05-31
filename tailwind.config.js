const { tint, lighten } = require('polished')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

// base colors
const brand = '#007ec1'
const brandGreen = '#95bc1a'

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
      },
      margin: {
        block: '30px',
      },
      padding: {
        '2/3': '66%',
      },
      spacing: {
        0.25: '1px',
        side: '16px',
      },
      outline: {
        gray: '1px dotted #212121',
      },
      boxShadow: {
        brand: `0 0 10px ${brand}, 0 0 5px ${brand}`,
      },
      fontFamily: {
        serlo: 'Karmilla, sans-serif',
      },
      minHeight: {
        8: '32px',
      },
      maxWidth: {
        65: '260px',
      },
      fontSize: {
        '2.5xl': '1.75rem',
      },
    },
    screens: {
      mobile: '500px',
      sm: '800px',
      md: '1024px',
      lg: '1216px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {
      // Custom utilities all start with `special-*`
      // They use css that is not covered by tailwind
      addUtilities({
        '.special-shadow-transform': {
          transform: 'rotate(3deg) translate(0px, -4px)',
        },
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
