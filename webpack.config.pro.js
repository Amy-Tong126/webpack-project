
module.exports = {
    // 生产环境
    mode: "production",
    optimization: {
        usedExports: true, // 哪些导出的模块被使⽤了，再做打包
        splitChunks: {// 代码分割
            chunks: 'all',
            cacheGroups: {// 缓存组
                lodash: {// 单独分离lodash库
                    chunks: "all",
                    test: /lodash-es/,
                    name: 'lodash'
                }
            }
        }
    }
}