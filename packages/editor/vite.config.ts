import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import replace from '@rollup/plugin-replace'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { existsSync, mkdirSync, writeFileSync } from 'fs'

// https://vitejs.dev/guide/build.html#library-mode

const notProvidedKeys = [
  '__NEXT_I18N_SUPPORT',
  '__NEXT_IMAGE_OPTS',
  '__NEXT_ROUTER_BASEPATH',
  '__NEXT_CLIENT_ROUTER_D_FILTER',
  '__NEXT_CLIENT_ROUTER_S_FILTER',
  '__NEXT_LINK_NO_TOUCH_START',
  '__NEXT_OPTIMISTIC_CLIENT_CACHE',
  '__NEXT_SCROLL_RESTORATION',
  '__NEXT_HAS_REWRITES',
  '__NEXT_CROSS_ORIGIN',
  '__NEXT_MANUAL_CLIENT_BASE_PATH',
  '__NEXT_STRICT_NEXT_HEAD',
  '__NEXT_TRAILING_SLASH',
  '__NEXT_EXTERNAL_MIDDLEWARE_REWRITE_RESOLVE',
  '__NEXT_CLIENT_ROUTER_FILTER_ENABLED',
  '__NEXT_MIDDLEWARE_PREFETCH',
  'NEXT_RUNTIME',
  'NEXT_DEPLOYMENT_ID',
]

const envReplacements = {
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  'process.env.NEXT_PUBLIC_ENV': `"${process.env.NODE_ENV}"`,
  ...Object.fromEntries(
    notProvidedKeys.map((key) => [
      `process.env.${key}`,
      JSON.stringify(`NOT_PROVIDED_${key}`),
    ])
  ),
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
      external: ['react', 'react-dom', 'lit', '@serlo/editor-web-component'],
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
  define: {
    global: {},
  },
  assetsInclude: ['./src/editor-ui/assets/plugin-icons/**/*.svg'],
  plugins: [
    replace({ ...envReplacements, preventAssignment: false }),
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
