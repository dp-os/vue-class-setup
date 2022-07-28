import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index'),
            name: 'VueClassSetup',
            fileName: (format) => `vue-class-setup.${format}.js`
        }
    }
});
