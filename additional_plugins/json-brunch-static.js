var JsonBrunchStatic

JsonBrunchStatic = (() => {
  function JsonBrunchStatic (config1) {
    var ref, ref1
    this.config = config1
    if ((ref = this.config) != null ? ref.fileMatch : void 0) {
      this.handles = this.config.fileMatch
      delete this.config.fileMatch
    }
    if ((ref1 = this.config) != null ? ref1.fileTransform : void 0) {
      this.transformPath = this.config.fileTransform
      delete this.config.fileTransform
    }
  }

  JsonBrunchStatic.prototype.handles = /\.static\.(?:json)$/

  JsonBrunchStatic.prototype.transformPath = (filename) => {
    return filename.replace(/\.static\.\w+$/, '.json')
  }

  JsonBrunchStatic.prototype.compile = (data, filename, options, callback) => {
    return callback(null, data)
  }

  return JsonBrunchStatic
})()

module.exports = (config) => {
  return new JsonBrunchStatic(config)
}
