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
      spacing: {
        0.25: '1px',
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
      })

      // Custom components al start with `serlo-*`
      // They serve as a lightwight abstraction for common elements
      // Or they need to use css selectors - with is hacky, but sometimes the best way to go
      // Use react components for more complex elements
      addComponents({
        '.serlo-link': {
          '@apply text-brand no-underline break-words hover:underline': {},
        },
        '.serlo-button': {
          '@apply inline-block transition-all rounded-4xl py-1 px-2': {},
          '@apply font-bold border-none cursor-pointer no-underline': {},
          '@apply text-lg leading-browser font-serlo tracking-slightestly-tighter': {},
        },
        '.serlo-list': {
          '@apply mx-4 mb-block mt-0 pl-7 list-none': {},
          '@apply special-reset-list-counter': {},

          '> li:before': {
            '@apply absolute special-content-list-counter special-increment-list-counter': {},
            '@apply font-bold align-middle text-center rounded-full -ml-7': {},
            '@apply mt-0.5 bg-brand-150 w-4 h-4 text-xs': {},
            '@apply leading-tight text-brand pt-0.25': {},
          },
          '> li': {
            '@apply mb-2': {},
          },
          '> li > ul, > li > ol': {
            '@apply mt-2': {},
            marginBottom: '16px !important',
          },
        },
        '.serlo-math-wrapper': {
          '@apply px-4 w-full text-left mb-block py-0.5': {},
          '@apply text-lg leading-browser overflow-x-auto overflow-y-hidden': {},
        },
        '.serlo-important': {
          '@apply border-l-6 border-brand p-2.5 mb-block mx-4': {},
        },
        '.serlo-spoiler-body': {
          '@apply pt-6 pb-3.5 border-l-8 border-brand': {},
        },
        '.serlo-solution-box': {
          '@apply py-2.5 mx-4 mb-block border-l-8 border-brand-150': {},
        },
        '.serlo-styled-label': {
          '@apply flex items-center cursor-pointer': {},
          '> div > *': {
            // hacky selector
            '@apply ml-2': {},
          },
        },
        '.serlo-image-centered': {
          '@apply px-4 mb-block text-center': {},
        },
        '.serlo-exercise-wrapper': {
          '@apply mt-10 mb-2.5': {},

          '@media (hover: hover)': {
            // -> use tailwind stuff instead
            input: {
              '@apply opacity-20 transition-opacity': {},
            },

            '&:hover': {
              // UwU
              input: {
                '@apply: opacity-100': {},
              },
            },
          },
        },
        '.serlo-input-font-reset': {
          '@apply text-base tracking-slightestly-tighter font-serlo': {},
        },
        '.serlo-content-with-spacing-fixes': {
          // this feels really hacky
          '@apply break-words': {},
          'p + ul': {
            '@apply -mt-3.5': {},
          },
          'li > p': {
            '@apply mx-0 mb-2': {},
          },
          'li > .serlo-math-wrapper': {
            '@apply px-0': {},
          },
          '.serlo-important, .serlo-spoiler-body, .serlo-solution-box, .serlo-styled-label, li, th, td': {
            '> p:last-child, > .serlo-math-wrapper:last-child, > ul:last-child, > ol:last-child,\
             > .serlo-image-centered:last-child, > .serlo-exercise-wrapper:last-child': {
              '@apply mb-0': {},
            },
            '> .serlo-exercise-wrapper:first-child': {
              '@apply mt-0': {},
            },
          },
        },
      })
    }),
  ],
}
