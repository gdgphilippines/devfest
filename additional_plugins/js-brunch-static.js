var JsBrunchStatic

JsBrunchStatic = (() => {
  function JsBrunchStatic (config1) {
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

  JsBrunchStatic.prototype.handles = /\.static\.(?:js)$/

  JsBrunchStatic.prototype.transformPath = (filename) => {
    return filename.replace(/\.static\.\w+$/, '.js')
  }

  JsBrunchStatic.prototype.compile = (data, filename, options, callback) => {
    return callback(null, data)
  }

  return JsBrunchStatic
})()

module.exports = (config) => {
  return new JsBrunchStatic(config)
}
