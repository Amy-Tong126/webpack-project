
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.config.base.js");
const devConfig = require('./webpack.config.dev.js');
const proConfig = require('./webpack.config.pro.js');
const mpaConfig = require("./webpack.config.mpa.js");
console.log(process.env.NODE_ENV)
const config = {
    development: devConfig,
    production: proConfig,
    mpa: mpaConfig
}
module.exports = webpackMerge.merge(
    commonConfig,
    config[process.env.NODE_ENV || "development"]
)