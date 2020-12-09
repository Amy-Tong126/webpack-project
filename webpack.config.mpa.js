const path = require('path');
const glob = require('glob-all');// 可以通过*匹配到路径
const htmlWebpackPlugin = require('html-webpack-plugin');

// glob匹配到多个入口的地址，返回的是一个路径的数组
const entryArr = glob.sync(path.resolve(__dirname, './src/pages/*/index.js'));
// 插件数组和入口配置
const plguinArr = [];
const entryObj = {}

entryArr.map((filePath) => {
    const match = filePath.match(/\/src\/pages\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entryObj[pageName] = filePath;
    plguinArr.push(
        new htmlWebpackPlugin({
            title: pageName,
            filename: pageName + ".html",
            template: path.resolve(__dirname, `./src/pages/${pageName}/index.html`),
            // 2个入口，2个chunk,2个new htmlWebpackPlugin
            // 如不配置chunks,其默认为all,会将所有js都引入到html页面中，这是mpa不希望的，所以要每个单独引入
            chunks: [pageName]
        })
    )
})

console.log({
    entry: entryObj,
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        ...plguinArr
    ]
})

module.exports = {
    entry: entryObj,
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        ...plguinArr
    ]
}
