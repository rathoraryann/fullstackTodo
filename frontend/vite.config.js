import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Optional: Customize build output directory
  build: {
    outDir: 'dist', // Default is 'dist', change if needed
    sourcemap: true, // Enable sourcemaps for debugging
  },

  // Optional: Customize server settings
  server: {
    port: 3000, // Change the dev server port
    open: true, // Automatically open the browser on server start
  },

  // Optional: Define base path for production
  base: '/', // Set this if your app is deployed in a subdirectory
});
