import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue2 from '@vitejs/plugin-vue2';


export default defineConfig({
    plugins: [vue2(), dts()],
    build: {
        lib: {
            formats: ['cjs', 'es'],
            entry: resolve(__dirname, 'src/vue-class-setup'),
            fileName: (format) => `vue-class-setup.${format}.js`
        },
        minify: false,
        rollupOptions: {
            external: ['vue']
        }
    },
    resolve: {
        alias: {
            'vue-class-setup': resolve('./src/vue-class-setup')
        }
    }
});
