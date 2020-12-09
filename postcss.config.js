const autoPrefix = require("autoprefixer");

module.exports = {
    plugins: [
        autoPrefix({
            overrideBrowserslist: ["last 2 versions", ">1%"]
        })
    ]
}