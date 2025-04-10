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
   server: {
      host: '0.0.0.0', // Mở kết nối cho tất cả thiết bị
      port: 5173, // Chọn cổng bất kỳ
   },
});
