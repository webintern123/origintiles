import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Shortcut to src folder
      '@': path.resolve(__dirname, './src'),

      // Local assets
      'figma:asset/f7842a031a2c244ce3c6d1fc17413f54620e74ef.png': path.resolve(
        __dirname,
        './src/assets/f7842a031a2c244ce3c6d1fc17413f54620e74ef.png'
      ),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
