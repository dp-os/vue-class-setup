/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue2 from '@vitejs/plugin-vue';

export default defineConfig({
    // @ts-ignore
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            reporter: ['lcov', 'html'],
        },
    },
    plugins: [vue2(), dts()],
    build: {
        lib: {
            formats: ['cjs', 'es'],
            entry: resolve(__dirname, 'src/index')
        },
        minify: false,
        rollupOptions: {
            external: ['vue'],
        },
    },
    resolve: {
        alias: {
            'vue-class-setup': resolve('./src/index'),
        },
    },
});
