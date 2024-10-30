import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/guide/build.html#library-mode

// We already strip most of the env variables in the built of the editor,
// however React seems to reintroduce this one!
const envReplacements = {
  'process.env.NODE_ENV': JSON.stringify('production'),
}

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'EditorWebComponent',
      fileName: 'serlo-editor-web-component',
      formats: ['es'],
    },
    // We are bundling react and react-dom by not excluding them!
    rollupOptions: {},
  },
  plugins: [
    replace({ ...envReplacements, preventAssignment: false }),
    react(),
    dts({
      outDir: 'dist',
      strictOutput: true,
      rollupTypes: true,
    }),
  ],
})
