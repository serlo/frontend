import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/guide/build.html#library-mode
/* we use vite only for building the serlo editor package */

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  esbuild: {
    target: 'esnext'
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/package/index.ts'),
      name: 'editor',
      fileName: 'editor',
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [
        visualizer({ open: true, filename: 'bundle-analysis.html' }),
      ],
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
    cssInjectedByJsPlugin(),
  ],
})
