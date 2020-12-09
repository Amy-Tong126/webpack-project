const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
    // 开发环境
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    plugins: [
        new HardSourceWebpackPlugin(),
    ],
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 3000,
        hot: false
    }
}
