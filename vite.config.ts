import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/guide/build.html#library-mode

/* we use vite only for building the serlo editor package */

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/serlo-editor/package/index.ts'),
      name: 'frontend',
      fileName: 'frontend',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react(), dts()],
})
