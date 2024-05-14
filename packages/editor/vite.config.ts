import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import fs from 'fs'

// https://vitejs.dev/guide/build.html#library-mode
/* we use vite only for building the serlo editor package */

function injectCssPlugin() {
  return {
    name: 'inject-css-plugin',
    generateBundle(_, bundle) {
      console.log({ bundle })
      // const cssFileName = 'style.css'
      const cssFileName = Object.keys(bundle).find((file) =>
        file.endsWith('.css')
      )

      const jsFileName = Object.keys(bundle).find((file) =>
        file.endsWith('.js')
      )

      if (!cssFileName || !jsFileName) {
        throw new Error('JS or CSS bundle not found!')
      }

      const cssFile = bundle[cssFileName]
      const jsFile = bundle[jsFileName]
      console.log({ cssFile })
      console.log({ jsFile })
      if (cssFile.type !== 'asset' || jsFile.type !== 'chunk') {
        this.error('CSS file is not an asset or JS file is not a chunk!')
        return
      }

      const cssCode = cssFile.source

      if (typeof cssCode !== 'string') {
        this.error('CSS code is not a string!')
        return
      }

      // Inject CSS code into the JS bundle
      jsFile.code = `
          (function() {
            const style = document.createElement('style');
            style.textContent = \`${cssCode}\`;
            document.head.appendChild(style);
          })();
          ${jsFile.code}
        `
    },
  }
}

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
    injectCssPlugin(),
  ],
  css: {},
})
