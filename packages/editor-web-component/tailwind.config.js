import sharedTailwindBase from '@serlo/frontend/shared/tailwind-base.js'

// This file is probably not needed and can be deleted!

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedTailwindBase],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../apps/web/src/**/*.{js,ts,jsx,tsx}',
  ],
}
