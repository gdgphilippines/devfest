import app from '../../app'

export default (superClass) => {
  return class extends superClass {
    constructor () {
      super()
      this.__observeProps = {}
    }
    _fetchJson (content, prop) {
      fetch(`${app.contentRepo + app.branch}/${content}`)
        .then(res => {
          return res.json()
        })
        .then(json => {
          this._setProperty(prop, json)
        })
    }

    _fetchContent (content) {
      fetch(`${app.contentRepo + app.branch}/${content}`)
      .then(res => {
        return res.text()
      })
        .then(body => {
          var props = this.constructor.properties
          // resets value
          for (var i in this.__observeProps) {
            if (this.__observeProps[i] && props[i]) {
              this[i] = props[i].value
            }
          }

          const contentArray = body.split('=====')
          contentArray.forEach(contentBody => {
            if (contentBody && contentBody.trim()) {
              const [query, content] = contentBody.split('-----')
              const [property, type] = query.split(':')
              const propArray = property.split('.')
              var push = propArray[propArray.length-1]
              push = push ? push.trim() : ''
              var newContent = ''
              var newType = type ? type.trim() : 'md'
              if (newType === 'json') {
                newContent = JSON.parse(content)
              } else {
                newContent = content
              }

              if (propArray[0]) {
                this.__observeProps[propArray[0].trim()] = true
              }

              if (push && push === '$push') {
                this.push(propArray
                  .slice(0, propArray.length - 1)
                  .map(item => {
                    return item && item.trim()
                  })
                  .join('.'),
                  newContent
                )
              } else {
                this._setProperty(property.trim(), newContent)
              }
            }
          })

          // fix for markdown not adding a class for shady css
          Polymer.RenderStatus.afterNextRender(this, () => {
            const markdown = this.shadowRoot.querySelectorAll('[slot=markdown-html]')
            if (markdown) {
              markdown.forEach((item) => {
                item.querySelectorAll('*').forEach((node) => {
                  node.classList.add(this.nodeName.toLowerCase())
                })
              })
            }
          })
        })
    }
  }
}