// import 'polymer/lib/mixins/property-effects.html'
export default (superClass) => {
  return class extends superClass {
    connectedCallback () {
      if (super.connectedCallback) {
        super.connectedCallback()
      }

      // initialize values
      this.paramsObject = {}
      this._dontReact = false
    }

    // static get observedAttributes () {
    //   const observedAttributes = super.observedAttributes || []
    //   return observedAttributes.concat(['paramsString', 'paramsObject', '_dontReact'])
    // }

    // _propertiesChanged (currentProps, changedProps, oldProps) {
    //   if (super._propertiesChanged) {
    //     super._propertiesChanged(currentProps, changedProps, oldProps)
    //   }
    //   if ('paramsString' in changedProps) {
    //     if (changedProps['paramsString'] !== oldProps['paramsString']) {
    //       this._paramsStringChanged()
    //     }
    //   }
    //   if ('query' in changedProps) {
    //     if (changedProps['query'] !== oldProps['query']) {
    //       this._queryChanged(changedProps['query'])
    //     }
    //   }
    // }

    _queryChanged (query) {
      this.paramsString = query
    }

    _paramsStringChanged () {
      this._dontReact = true
      this.paramsObject = this._decodeParams(this.paramsString)
      this._dontReact = false
    }

    paramsObjectChanged () {
      console.log('paramsObject')
      if (this._dontReact) {
        return
      }
      this.paramsString = this._encodeParams(this.paramsObject)
          .replace(/%3F/g, '?').replace(/%2F/g, '/').replace(/'/g, '%27')
    }

    _encodeParams (params) {
      var encodedParams = []
      for (var key in params) {
        var value = params[key]
        if (value === '') {
          encodedParams.push(encodeURIComponent(key))
        } else if (value) {
          encodedParams.push(
              encodeURIComponent(key) +
              '=' +
              encodeURIComponent(value.toString())
          )
        }
      }
      return encodedParams.join('&')
    }

    _decodeParams (paramString) {
      var params = {}
      // Work around a bug in decodeURIComponent where + is not
      // converted to spaces:
      paramString = (paramString || '').replace(/\+/g, '%20')
      var paramList = paramString.split('&')
      for (var i = 0; i < paramList.length; i++) {
        var param = paramList[i].split('=')
        if (param[0]) {
          params[decodeURIComponent(param[0])] =
              decodeURIComponent(param[1] || '')
        }
      }
      return params
    }
  }
}
