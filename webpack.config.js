
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.config.base.js");
const devConfig = require('./webpack.config.dev.js');
const proConfig = require('./webpack.config.pro.js');
console.log(process.env.NODE_ENV)
module.exports = webpackMerge.merge(
    commonConfig,
    process.env.NODE_ENV == 'development' ? devConfig : proConfig
)