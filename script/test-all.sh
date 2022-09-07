#! /bin/bash
set -e

rm -rf node_modules
rm -rf node_modules_back
yarn install
yarn lint
yarn run build
yarn run coverage

mv node_modules node_modules_back

cd examples/vite-vue2
rm -rf node_modules
yarn install
yarn run build
cd ../../

cd examples/vite-vue3
rm -rf node_modules
yarn install
yarn run build
cd ../../

mv node_modules_back node_modules
yarn run coveralls
