

npm init -y
npm install --save-dev webpack webpack-cli
npm install --save-dev typescript ts-loader
npx tsc --init
npm install --save-dev webpack-dev-server@4
npm install --save-dev @webpack-cli/generators
npm i --save-dev @types/node
echo "" >webpack.config.js
mkdir dist
echo ""> dist/index.html
mkdir src
echo "">index.ts
