const { tint } = require('polished')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

// base colors
const brand = '#007ec1'

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
        truegray: colors.trueGray,
      },
      borderWidth: {
        3: '3px',
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
      spacing: {
        0.25: '1px',
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
      addComponents({
        '.serlo-link': {
          '@apply text-brand no-underline break-words hover:underline': {},
        },
        '.serlo-button': {
          '@apply inline-block transition-all rounded-4xl py-1 px-2': {},
          '@apply font-bold border-none cursor-pointer no-underline': {},
          '@apply text-lg leading-browser serlo-font tracking-slightestly-tighter': {},
        },
        '.serlo-list': {
          '@apply mx-4 mb-block mt-0 pl-7 list-none': {},
          '@apply reset-list-counter': {},

          '> li:before': {
            '@apply absolute content-list-counter increment-list-counter': {},
            '@apply font-bold align-middle text-center rounded-full -ml-7': {},
            '@apply mt-0.5 bg-brand-150 w-4 h-4 text-xs': {},
            '@apply leading-tight text-brand pt-0.25': {},
          },
          '> li > ul, > li > ol': {
            '@apply mt-2': {},
            marginBottom: '16px !important',
          },
        },
        '.serlo-li': {
          '@apply mb-2': {},
        },
      })

      addUtilities({
        '.boxshadow-brand': {
          boxShadow: `0 0 10px ${brand}`,
        },
        '.boxshadow-slightly-rotated': {
          transform: 'rotate(3deg) translate(0px, -4px)',
        },
        '.half-circle-border-transparent': {
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
        },
        '@media print': {
          '.serlo-no-after-content:after': {
            content: '"" !important',
          },
        },
        '.serlo-special-css': {
          // a little monster, will definitively break soon
          // I have some ideas to make this better (use nested variants and class names to fix this)
          '@apply break-words': {},
          'p + ul': {
            '@apply -mt-3.5': {},
            '.serlo-test': {
              color: 'blue',
            },
          },
          'li > p': {
            '@apply mx-0 mb-2': {},
          },
          "li > [class*='MathWrapper']": {
            '@apply px-0': {},
          },
          "[class*='Important'], [class*='SpoilerBody'], [class*='SolutionBox'], [class*='StyledLabel'], li, th, td": {
            "> p:last-child, > [class*='MathWrapper']:last-child, > ul:last-child, > ol:last-child, > [class*='ImgCentered']:last-child, > [class*='exercise__Wrapper']:last-child": {
              '@apply mb-0': {},
            },
            "> [class*='exercise__Wrapper']:first-child": {
              '@apply mt-0': {},
            },
          },
        },
        '.serlo-font': {
          fontFamily: 'Karmilla, sans-serif',
        },
        '.serlo-input-font-reset': {
          '@apply text-base tracking-slightestly-tighter serlo-font': {},
        },
        '.reset-list-counter': {
          'counter-reset': 'list-counter',
        },
        '.content-list-counter': {
          content: 'counter(list-counter)',
        },
        '.increment-list-counter': {
          'counter-increment': 'list-counter',
        },
      })
    }),
  ],
}
