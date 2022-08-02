/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue2 from '@vitejs/plugin-vue';


export default defineConfig({
    // @ts-ignore
    test: {
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        environment: 'happy-dom',
        coverage: {
            reporter: ['lcov', 'html'],
        }
    },
    plugins: [vue2(), dts()],
    build: {
        lib: {
            formats: ['cjs', 'es'],
            entry: resolve(__dirname, 'src/index'),
            fileName: (format) => `vue-class-setup.${format}.js`
        },
        minify: false,
        rollupOptions: {
            external: ['vue']
        }
    },
    resolve: {
        alias: {
            'vue-class-setup': resolve('./src/index')
        }
    }
});
