const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Para archivos CSS
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Asegúrate de que el archivo HTML esté en la carpeta src
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Aquí se define la carpeta desde la que servir archivos estáticos
    },
    compress: true,
    port: 3000,
    open: true, // Esto abre automáticamente el navegador
  },
};
