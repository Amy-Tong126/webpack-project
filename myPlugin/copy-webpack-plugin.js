module.exports = class CopyWebpackPlugin {
    constructor(params) {
        console.log(params, '----')// 可以打印接收的参数{name:"hello"}
    };

    apply(compiler) {
        // 通过compiler.hooks.emit.tapAsync 是生命周期钩子钩入处理函数
        compiler.hooks.emit.tapAsync("CopyWebpackPlugin", (compilation, cb) => {
            // compilation 构建到当前阶段的资源
            // cb 继续执行下一个插件
            compilation.assets['copy.txt'] = {
                source: function () {
                    return "hello plugin!"
                },
                size: function () {
                    return 20
                }
            }
            cb();
        })
    }
}