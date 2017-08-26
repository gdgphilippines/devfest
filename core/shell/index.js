import 'polymer/lib/mixins/property-accessors.html'
import 'polymer/lib/utils/flattened-nodes-observer.html'
import LocationMixin from '../mixins/location-mixin.js'
import QueryParamsMixin from '../mixins/query-params-mixin.js'
import pathToRegexp from 'path-to-regexp'
import routing from '../../src/routing.js'
import httpCodes from '../../src/http-codes.js'
import partials from '../../src/partials.js'

const messages = []

class AppShell extends QueryParamsMixin(LocationMixin(Polymer.PropertyAccessors(window.HTMLElement))) {
  static get is () { return 'app-shell' }

  static get observedAttributes () {
    const observedAttributes = super.observedAttributes || []
    return observedAttributes.concat(['params', 'queryParams', 'currentRoute'])
  }

  constructor () {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.setAttribute('is', 'custom-style')
    style.innerHTML = `div[role='main'] {
      position: relative;
    }

    ::slotted(.page) {
      position: absolute;
      background-color: white;
      width: 100%;
      top: 0;
      opacity: 0;
      z-index: -1;
      transition: opacity 0.3s;
    }

    ::slotted(*) > .page {
      position: absolute;
      background-color: white;
      width: 100%;
      top: 0;
      opacity: 0;
      z-index: -1;
      transition: opacity 0.3s;
    }

    ::slotted(.page--on-view) {
      position: relative !important;
      opacity: 1;
      z-index: 0;
    }

    ::slotted(*) > .page--on-view {
      position: relative !important;
      opacity: 1;
      z-index: 0;
    }`
    const main = document.createElement('div')
    main.setAttribute('class', 'main')
    const slot = document.createElement('slot')
    main.appendChild(slot)
    const toast = document.createElement('app-toast')
    shadowRoot.appendChild(style)
    shadowRoot.appendChild(main)
    shadowRoot.appendChild(toast)
    this._routes = {}
  }

  connectedCallback () {
    if (super.connectedCallback) {
      super.connectedCallback()
    }
    this._enableProperties() // turn on accessors
    this._observer = new Polymer.FlattenedNodesObserver(this, (info) => {
      this._contentAdded(info.addedNodes.filter((node) => (node.nodeType === window.Node.ELEMENT_NODE)))
    })
    // registerServiceWorker(this)
    System.import('../modules/app-toast/components/app-toast.html').then(() => {
      var messageInterval = setInterval(() => {
        if (messages.length > 0) {
          var {message, optTapHandler, optAction, optActionHandler, optDuration} = message.pop()
          this.showMessage(message, optTapHandler, optAction, optActionHandler, optDuration)
        } else {
          clearInterval(messageInterval)
          messageInterval = null
        }
      }, 5000)
    })
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback()
    }
    if (this._observer) this._observer.disconnect()
  }

  showMessage (message, optTapHandler, optAction, optActionHandler, optDuration) {
    if (this.shadowRoot.querySelector('app-toast').showMessage) {
      this.shadowRoot.querySelector('app-toast').showMessage(message, optTapHandler, optAction, optActionHandler, optDuration)
    } else {
      messages.push({message, optTapHandler, optAction, optActionHandler, optDuration})
    }
  }

  closeToast () {
    this.shadowRoot.querySelector('app-toast').close()
  }

  _propertiesChanged (currentProps, changedProps, oldProps) {
    if (super._propertiesChanged) {
      super._propertiesChanged(currentProps, changedProps, oldProps)
    }
    if ('path' in changedProps) {
      this._pathChanged(changedProps['path'])
    }
  }

  _contentAdded (pages) {
    pages.forEach(page => {
      page.classList.add('page')
      this._routes[page.getAttribute('route')] = {
        element: page
      }
    })
    this._pathChanged(this.path)
  }

  _pathChanged (path) {
    // load statistics if it went through here
    if (path === '/_statistic.html' || path === '/_bundle-sizes.html') {
      window.location.href = path
      return
    }

    var routeName = null
    Object.entries(this._routes).forEach(route => {
      if (routeName) return
      var params = {}
      const keys = []
      const re = pathToRegexp(route[0], keys)
      const exec = re.exec(path)

      if (exec) {
        params = {}
        for (var j = 0; j < keys.length; j++) {
          params[keys[j].name] = exec[j + 1]
        }
        routeName = route[0]
      }
    })

    this._loadPage(routeName || 'not-found')
  }

  _loadPage (route) {
    const routes = Object.assign({}, routing, httpCodes)
    for (var i in this._routes) {
      if (this._routes[i] && this._routes[i].element) this._routes[i].element.classList.remove('page--on-view')
    }
    if (this._routes[route] && this._routes[route].element) this._routes[route].element.classList.add('page--on-view')
    if (this._routes[route]) {
      routes[route]().then(() => {
        if (window.ga) {
          ga('set', 'page', this.path)
          ga('send', 'pageview')
        }
      })
    }
  }
}

AppShell.createPropertiesForAttributes()

window.customElements.define(AppShell.is, AppShell)

// load partials here
for (var p in partials) {
  partials[p]()
}

export default AppShell