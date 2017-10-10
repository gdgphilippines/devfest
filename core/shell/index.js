import 'polymer/polymer.html'
import 'polymer/lib/utils/flattened-nodes-observer.html'
import LocationMixin from '../mixins/location-mixin.js'
import QueryParamsMixin from '../mixins/query-params-mixin.js'
import pathToRegexp from 'path-to-regexp'
import routing from '../../src/routing.js'
import httpCodes from '../../src/http-codes.js'
import partials from '../../src/partials.js'
import auth from '../../src/authentication/index.js'
import { reducers, store, ReduxMixin } from '../modules/state-manager';
import { combineReducers } from 'redux';
import '../../src/firebase';

const ROUTER_ACTION = {
  PARAMS: 'ROUTER_UPDATE_PARAMS',
  ROUTE: 'ROUTER_UPDATE_ROUTE'
};

reducers.router = (router = {}, action) => {
  switch (action.type) {
    case ROUTER_ACTION.PARAMS:
      return Object.assign({}, router, {
        params: action.params
      });
    case ROUTER_ACTION.ROUTE:
      return Object.assign({}, router, {
        route: action.route
      });
    default:
      return router;
  }
};

store.replaceReducer(combineReducers(reducers));

export { ROUTER_ACTION };

const messages = []

class AppShell extends ReduxMixin(QueryParamsMixin(LocationMixin(Polymer.Element))) {
  static get is () { return 'app-shell' }

  static get properties () {
    return {
      params: {
        type: Object
      },

      queryParams: {
        type: Object
      },

      currentRoute: {
        type: String
      },

      // location-mixin
      path: {
        type: String
      },

      query: {
        type: String,
        observer: '_queryChanged'
      },

      urlSpaceRegex: {
        type: String
      },

      hash: {
        type: String
      },

      dwellTime: {
        type: Number
      },

      _urlSpaceRegExp: {
        type: String,
        computed: '_makeRegExp(urlSpaceRegex)'
      },

      _lastChangedAt: {
        type: String
      },

      _initialized: {
        type: Boolean
      },

      // query params 'paramsString', 'paramsObject', '_dontReact'

      paramsString: {
        type: String,
        observer: '_paramsStringChanged'
      },

      paramsObject: {
        type: Object
      },

      _dontReact: {
        type: Boolean
      }
    }
  }

  static get observers () {
    return [
      '_pathChanged(path)',
      '_updateUrl(path, query, hash)'
    ]
  }

  static get template () {
    return `
      <style is="custom-style">
        div[role='main'] {
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
          display: none;
        }

        ::slotted(*) > .page {
          position: absolute;
          background-color: white;
          width: 100%;
          top: 0;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s;
          display: none;
        }

        ::slotted(.page--on-view) {
          position: relative !important;
          opacity: 1;
          z-index: 0;
          display: block;
        }

        ::slotted(*) > .page--on-view {
          position: relative !important;
          opacity: 1;
          z-index: 0;
          display: block;
        }
      </style>

      <div class="main">
        <slot></slot>
      </div>

      <app-toast></app-toast>
    `
  }

  constructor () {
    super()
    this._routes = {}
  }

  connectedCallback () {
    super.connectedCallback()
    this._observer = new Polymer.FlattenedNodesObserver(this, (info) => {
      this._contentAdded(info.addedNodes.filter((node) => (node.nodeType === window.Node.ELEMENT_NODE)))
    })
    import(/* webpackChunkName: "app-toast" */ '../modules/app-toast/components/app-toast.html').then(() => {
      var messageInterval = setInterval(() => {
        if (messages.length > 0) {
          var {message, optTapHandler, optAction, optActionHandler, optDuration} = messages.pop()
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

  _contentAdded (pages) {
    pages.forEach(page => {
      page.classList.add('page')
      this._routes[page.getAttribute('route')] = {
        element: page,
        auth: page.getAttribute('auth')
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

    path = path.replace(/index\.html$/, '')

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
        this.params = params

        this.dispatch({
          type: ROUTER_ACTION.PARAMS,
          params
        });
      }
    })

    this.dispatch({
      type: ROUTER_ACTION.ROUTE,
      route: routeName || 'not-found'
    });

    this._checkAuth(routeName || 'not-found')
  }

  _checkAuth (route) {
    if (this._routes[route] && this._routes[route].auth && auth[this._routes[route].auth]) {
      if (auth[this._routes[route].auth] instanceof Promise) {
        auth[this._routes[route].auth]()
        .then((res) => {
          if (res) {
            this._loadPage(route)
          } else {
            this._loadPage('not-authorized')
          }
        })
        .catch((e) => {
          console.log(e)
          this._loadPage('not-authorized')
        })
      } else if (typeof auth[this._routes[route].auth] === 'function' && auth[this._routes[route].auth](this)) {
        this._loadPage(route)
      } else {
        this._loadPage('not-authorized')
      }
    } else {
      this._loadPage(route)
    }
  }

  _loadPage (route) {
    const routes = Object.assign({}, routing, httpCodes)
    for (var i in this._routes) {
      if (this._routes[i] && this._routes[i].element) this._routes[i].element.classList.remove('page--on-view')
    }

    if (this._routes[route] && this._routes[route].element) {
      this._routes[route].element.classList.add('page--on-view')
    }
    if (this._routes[route]) {
      routes[route]().then(() => {

        if (!this._routes[route].element.constructor.is ||
          this._routes[route].element.constructor === this._routes[route].element.nodeName.toLowerCase()) {
          this.dispatch({
            type: ROUTER_ACTION.ROUTE,
            route: 'not-found'
          });

          this._checkAuth('not-found')
        }

        this._routes[route].element._setProperty('params', this.params)
        this._routes[route].element._setProperty('queryParams', this.paramsObject)

        if (this._routes[route].element.reload) {
          this._routes[route].element.reload()
        }

        if (document.querySelector('.header') && document.querySelector('.header').reload) {
          document.querySelector('.header').reload()
        }

        if (document.querySelector('.drawer') && document.querySelector('.drawer').reload) {
          document.querySelector('.drawer').reload()
        }

        window.scrollTo(0, 0)
        if (window.ga) {
          ga('set', 'page', this.path)
          ga('send', 'pageview')
        }
      })
    }
  }
}

window.customElements.define(AppShell.is, AppShell)

// load partials here
for (var p in partials) {
  partials[p]()
}

export default AppShell
