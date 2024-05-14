import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { existsSync, mkdirSync, writeFileSync } from 'fs'

// https://vitejs.dev/guide/build.html#library-mode
/* we use vite only for building the serlo editor package */

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
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
    dts({
      outDir: 'dist',
      strictOutput: true,
      rollupTypes: true,
    }),
    svgr({ include: '**/*.svg' }),
    cssInjectedByJsPlugin({
      // Tried using the injectCodeFunction, but it didn't get called.
      // preRenderCSSCode works!
      preRenderCSSCode: (cssCode) => {
        try {
          // Ensure the dist directory exists
          const distDir = resolve(__dirname, 'dist')
          if (!existsSync(distDir)) {
            mkdirSync(distDir, { recursive: true })
          }

          // Write the CSS to a file. Usually, this plugin excludes css bundles
          // from the output but we need to export it for the shadow DOM
          writeFileSync(resolve(__dirname, 'dist', 'style.css'), cssCode)
        } catch (e) {
          console.error('Failed to write CSS to file', e)
        }
        return cssCode
      },
    }),
  ],
})
