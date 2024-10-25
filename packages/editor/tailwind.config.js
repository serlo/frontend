import sharedTailwindBase from '@serlo/frontend/shared/tailwind-base.js'
import { serloEditorPlugin } from './src/tailwind/serlo-editor-plugin'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedTailwindBase],
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [serloEditorPlugin],
}
