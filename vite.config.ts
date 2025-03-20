import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                category: resolve(__dirname, 'category.html'),
                productDetail: resolve(__dirname, 'product-detail.html'),
            },
        },
    },
});