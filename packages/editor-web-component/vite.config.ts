import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
// I wonder how many plugins we can get rid off here. Probably everything but
// the React one?
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/guide/build.html#library-mode

const js = (value: string) => JSON.stringify(value)

const productionKeys = ['process.env.NODE_ENV', 'process.env.NEXT_PUBLIC_ENV']

const notProvidedKeys = [
  '__NEXT_I18N_SUPPORT',
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
  ...Object.fromEntries(productionKeys.map((key) => [key, 'production'])),
  ...Object.fromEntries(notProvidedKeys.map((key) => [key, 'NOT_PROVIDED'])),
}

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/editor-web-component.tsx'),
      name: 'EditorWebComponent',
      fileName: 'serlo-editor-web-component',
      formats: ['es'],
    },
    // We are bundling react and react-dom by not excluding them!
    rollupOptions: {},
  },
  plugins: [
    replace(envReplacements),
    react(),
    dts({
      outDir: 'dist',
      strictOutput: true,
      rollupTypes: true,
    }),
    svgr({ include: '**/*.svg' }),
    cssInjectedByJsPlugin(),
  ],
})
