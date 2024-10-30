import * as fs from 'fs'
import * as path from 'path'
import plugin from 'tailwindcss/plugin'
import sharedTailwindBase from '../../packages/editor/src/tailwind/tailwind-base.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedTailwindBase],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/editor/src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    plugin(function ({ addComponents }) {
      // add classes of serlo-components to autocomplete
      addComponents(extractCSSClasses())
    }),
  ],
  theme: {
    extend: {
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
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      maxWidth: {
        xs: '300px',
        65: '260px',
        '30p': '30%',
      },
      width: {
        '1/8v': '12.5vw',
        '1/4v': '25vw',
        '1/3v': '33vw',
      },
      height: {
        630: '630px',
      },
      fontFamily: {
        serlo: 'Karla, sans-serif',
        handwritten: 'Caveat, sans-serif',
      },
      minHeight: {
        8: '32px',
        '1/2': '50vh',
        '1/4': '25vh',
      },
    },
  },
}

function extractCSSClasses() {
  try {
    const css = fs.readFileSync(
      path.join(__dirname, '/src/assets-webkit/styles/components.css'),
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
