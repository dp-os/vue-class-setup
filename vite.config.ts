import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue2 from '@vitejs/plugin-vue2';


export default defineConfig({
    plugins: [vue2(), dts()],
    build: {
        lib: {
            formats: ['cjs', 'es'],
            entry: resolve(__dirname, 'src/class-setup'),
            name: 'VueClassSetup',
            fileName: (format) => `vue-class-setup.${format}.js`
        },
        minify: false,
        rollupOptions: {
            external: ['vue']
        }
    },
    optimizeDeps: {
        exclude: ['vue-demi']
     }
});
