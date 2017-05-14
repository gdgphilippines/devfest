var SassBrunchStatic, sass

sass = require('node-sass')

SassBrunchStatic = (() => {
  function SassBrunchStatic (config1) {
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

  SassBrunchStatic.prototype.handles = /\.static\.(?:scss|sass)$/

  SassBrunchStatic.prototype.transformPath = (filename) => {
    console.log(filename)
    return filename.replace(/\.static\.\w+$/, '.html')
  }

  SassBrunchStatic.prototype.compile = function (data, filename, options, callback) {
    console.log('compiling')
    return sass.render({data: data.toString()}, function (err, css) {
      if (err) {
        console.log(err)
        callback(null, '')
        // callback(err)
        return
      }
      return callback(null, css.css.toString())
    })
  }

  return SassBrunchStatic
})()

module.exports = (config) => {
  return new SassBrunchStatic(config)
}
