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
            const push = propArray[propArray.length-1]

            if (push && push === '$push') {
              this.push(propArray
                .slice(0, propArray.length - 1)
                .map(item => {
                  return item && item.trim()
                })
                .join('.'),
                content
              )
            } else {
              this._setProperty(property.trim(), content)
            }


          }
        })
      })
    }
  }
}