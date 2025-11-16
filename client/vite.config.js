import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://localhost:3000',
=======
        target: 'http://localhost:876',
>>>>>>> bed2e5e9d950598e9f45175f83ed407444ed0bbe
        secure: false,
      },
    },
  },

  plugins: [react()],
});
