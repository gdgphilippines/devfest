import app from '../../app'

export default (superClass) => {
  return class extends superClass {
    _fetchContent (content) {
      fetch(`${app.contentRepo + app.branch}/${content}`)
      .then(res => {
        return res.text()
      })
      .then(body => {
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
          this.shadowRoot.querySelectorAll('[slot=markdown-html]').forEach((item) => {
            item.querySelectorAll('*').forEach((node) => {
              node.classList.add(this.nodeName.toLowerCase())
            })
          })
        })
      })
    }
  }
}