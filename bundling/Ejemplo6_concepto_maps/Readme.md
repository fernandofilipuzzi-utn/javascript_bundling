
```bash
npm init -y
```

```bash
npm install --save-dev webpack webpack-cli
```

```bash
npm install --save-dev typescript ts-loader
```

== install dependencias ==

```bash
npm install 
```

== correr ==

```bash
npm run build
npm run dev
````



== Creación del proyecto ==

```bash
npx tsc --init
```

```bash
npm install --save-dev webpack-dev-server@4
```



```bash
npm install --save-dev @webpack-cli/generators
```

npm i --save-dev @types/node

```
echo "" >webpack.config.js
```

```  
mode: "production",
devtool: false,
```

```
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  devtool: false,
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    compress: true,
    port: 8080,
  },
};
```

package.json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve",
     "dev": "webpack serve --open"
}
```

```
mkdir dist
echo ""> dist/index.html
mkdir src
echo "">index.ts
```


```
npm run build
npm run dev
```