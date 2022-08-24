/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue2 from '@vitejs/plugin-vue';
import { buildDocs } from './script/build-docs';

buildDocs();

export default defineConfig({
    // @ts-ignore
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            reporter: ['lcov', 'html'],
        },
    },
    plugins: [
        vue2(),
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
