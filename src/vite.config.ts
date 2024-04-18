import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@src': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './src/assets'),
            '@common': resolve(__dirname, './src/common'),
            '@components': resolve(__dirname, './src/components'),
            '@pages': resolve(__dirname, './src/pages'),
            '@styles': resolve(__dirname, './src/styles'),
            '@utils': resolve(__dirname, './src/utils'),
            '@redux': resolve(__dirname, './src/redux'),
            '@config': resolve(__dirname, './src/config'),
        },
    },
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:11010',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, 'api/'),
            },
        },
        hmr: {
            overlay: false,
        },
    },
});