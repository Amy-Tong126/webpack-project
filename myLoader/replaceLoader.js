module.exports = function replaceLoader(source) {
    console.log(source, this.query.name, '-----');
    return source.replace('hello', this.query.name)
}