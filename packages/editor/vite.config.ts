import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/guide/build.html#library-mode
/* we use vite only for building the serlo editor package */

const buildTarget = process.env.BUILD_TARGET || 'react-package'
console.log(`building the ${buildTarget}`)

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build:
    buildTarget === 'web-component'
      ? {
          lib: {
            entry: resolve(__dirname, 'src/package/editor-web-component.tsx'),
            name: 'EditorWebComponent',
            fileName: 'serlo-editor-web-component',
            formats: ['es'],
          },
          // Bundle react and react-dom by not excluding them!
          rollupOptions: {},
        }
      : {
          lib: {
            entry: resolve(__dirname, 'src/package/index.ts'),
            name: 'editor',
            fileName: 'editor',
            formats: ['es'],
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
      '@editor': resolve(__dirname, './src'),
      '@': resolve(__dirname, '../../apps/web/src'),
    },
  },
  plugins: [
    react(),
    dts(),
    svgr({ include: '**/*.svg' }),
    cssInjectedByJsPlugin(),
  ],
})
