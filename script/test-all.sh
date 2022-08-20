#! /bin/bash

rm -rf node_modules
yarn install
yarn run build
yarn run coverage

mv node_modules node_modules_back

cd examples/vite-vue3
rm -rf node_modules
yarn install
yarn run build
cd ../../

mv node_modules_back node_modules
yarn run coveralls