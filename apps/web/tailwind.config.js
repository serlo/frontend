import sharedTailwindBase from './shared/tailwind-base.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedTailwindBase],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/editor/src/**/*.{js,ts,jsx,tsx}',
  ],
}
