const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const optimiseCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, './dist'),
        // publicPath: '//666.cdn.com/'
    },
    // 生产环境
    // mode: "production",
    // optimization: {
    //     usedExports: true, // 哪些导出的模块被使⽤了，再做打包
    //     splitChunks: {// 代码分割
    //         chunks: 'all',
    //         cacheGroups: {// 缓存组
    //             lodash: {// 单独分离lodash库
    //                 chunks: "all",
    //                 test: /lodash-es/,
    //                 name: 'lodash'
    //             }
    //         }
    //     }
    // },
    // 开发环境
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    module: {
        rules: [
            {// 处理图片文件
                test: /\.(png|jpe?g|gif)$/,
                include: path.resolve(__dirname, './src'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "./asserts/images"// 输出到asserts下的images文件夹
                    }
                }
            },
            {// 处理css文件
                test: /\.css$/,
                include: path.resolve(__dirname, './src'),
                use: ['style-loader', 'css-loader']
            },
            {// 处理less文件
                test: /\.less$/,
                // loader从右向左依次处理，postcss-loader+autoprefixer 实现自动补全css前缀，注意需要配置postcss.config.js
                include: path.resolve(__dirname, './src'),
                use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {// 处理js
                test: /\.js$/,
                // exclude: "/node_modules/", // exclude include 用一个就可以了，推荐用include
                include: path.resolve(__dirname, './src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env",
                                {
                                    targets: {
                                        edge: "17",
                                        firefox: "60",
                                        chrome: "67",
                                        safari: "11.1"
                                    },
                                    corejs: 2,//新版本需要指定核⼼库版本
                                    useBuiltIns: "entry",
                                }
                            ],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            // {// 处理js--happypack
            //     test: /\.js$/,
            //     // exclude: "/node_modules/", // exclude include 用一个就可以了，推荐用include
            //     include: path.resolve(__dirname, './src'),
            //     use: [{
            //         loader: 'happypack/loader?id=babel'
            //     }]
            // },
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, './node_modules')],// 指定第三方模块查找路径、
        alias: {
            "@": path.resolve(__dirname, './src'),
        },
        extensions: [".js"]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "hello world 666!",
            filename: "index.html",
            template: "./src/index.html",
            minify: {
                removeComments: true,// 删除注释
                collapseWhitespace: true,// 合并空格
                minifyCSS: true// 压缩内联css
            }
        }),
        new CleanWebpackPlugin(),
        new miniCssExtractPlugin({
            filename: "[name]_[contenthash:6].css"
        }),
        new optimiseCssAssetsWebpackPlugin({// css文件压缩
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        new PurgeCSSPlugin({// css tree shaking
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径⽂件
                path.resolve(__dirname, './src/*.html'),
                path.resolve(__dirname, './src/*.js')
            ])
        }),
        // new HardSourceWebpackPlugin(),
        // new HappyPack({
        //     // ⽤唯⼀的标识符id，来代表当前的HappyPack是⽤来处理⼀类特定的⽂件
        //     id: 'babel',
        //     // 如何处理.js⽂件，⽤法和Loader配置中⼀样
        //     loaders: [{
        //         loader: 'babel-loader',
        //         options: {
        //             presets: [
        //                 ["@babel/preset-env",
        //                     {
        //                         targets: {
        //                             edge: "17",
        //                             firefox: "60",
        //                             chrome: "67",
        //                             safari: "11.1"
        //                         },
        //                         corejs: 2,//新版本需要指定核⼼库版本
        //                         useBuiltIns: "entry",
        //                     }
        //                 ],
        //                 '@babel/preset-react'
        //             ]
        //         }
        //     }],
        //     threadPool: happyThreadPool,
        // }),
    ],
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 3000,
        hot: false
    }
}