/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { buildDocs } from './script/build-docs';

buildDocs();

export default defineConfig({
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            reporter: ['lcov', 'html'],
        },
    },
    plugins: [
        vue(),
        dts({
            afterDiagnostic(list) {
                if (list.length) {
                    process.exit(1);
                }
            },
        }),
        {
            name: 'build-docs',
            buildEnd: buildDocs,
        },
    ],
    build: {
        lib: {
            formats: ['cjs', 'es'],
            entry: resolve(__dirname, 'src/index'),
            fileName(format) {
                return `index.${format}.js`;
            },
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
