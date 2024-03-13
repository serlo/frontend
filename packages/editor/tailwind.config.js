import sharedTailwindBase from '@serlo/frontend/shared/tailwind-base.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedTailwindBase],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../apps/web/src/**/*.{js,ts,jsx,tsx}',
  ],
}
