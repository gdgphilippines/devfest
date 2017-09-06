var workingURL
var urlDoc, urlBase, anchor
/**
 * @param {string} path
 * @param {string=} base
 * @return {!URL|!HTMLAnchorElement}
 */
export default (path, base) => {
  if (workingURL === undefined) {
    workingURL = false
    try {
      var u = new URL('b', 'http://a')
      u.pathname = 'c%20d'
      workingURL = (u.href === 'http://a/c%20d')
      workingURL = workingURL && (new URL('http://www.google.com/?foo bar').href === 'http://www.google.com/?foo%20bar')
    } catch (e) {}
  }
  if (workingURL) {
    return new URL(path, base)
  }
  if (!urlDoc) {
    urlDoc = document.implementation.createHTMLDocument('url')
    urlBase = urlDoc.createElement('base')
    urlDoc.head.appendChild(urlBase)
    anchor = /** @type {HTMLAnchorElement} */(urlDoc.createElement('a'))
  }
  urlBase.href = base
  anchor.href = path.replace(/ /g, '%20')
  return anchor
}
