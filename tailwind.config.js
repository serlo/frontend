module.exports = {
  presets: [require('./shared/tailwind-base.cjs')],
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
