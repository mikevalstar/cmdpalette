import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true }), react()],
  server: {
    port: 3300,
  },
  build: {
    sourcemap: true,
    lib: {
      type: ['es', 'cjs', 'umd'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CmdPalette',
      fileName: (format) => `index.${format}.js`,
    },
    target: 'esnext',
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
});
