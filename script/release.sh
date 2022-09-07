#! /bin/bash
version=`node -e "console.log(require('./package.json').version)"`

npm publish --registry=https://registry.npmjs.org
git add .
git commit -m "release: vue-class-setup@$version"
git push