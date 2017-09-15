import 'polymer/polymer.html'
import 'polymer/lib/mixins/gesture-event-listeners.html'
import 'app-layout/app-header/app-header.html'
import 'app-layout/app-toolbar/app-toolbar.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import '../devfest-button/devfest-button.js'
import '../devfest-icon-button/devfest-icon-button.js'
import '../gdg-logo/gdg-logo.js'
import '../../fonts/devfest-fonts.html'
import './devfest-header.html'
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js'

class DevfestHeader extends contentLoaderMixin(Polymer.GestureEventListeners(Polymer.Element)) {
  static get is () { return 'devfest-header' }

  static get properties () {
    return {
      menu: {
        type: Array
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.reload()
    this._observedObject = null
    if (window.IntersectionObserver) {
      this._observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === this._observedObject) {
            if (!entry.isIntersecting) {
              this.shadowRoot.querySelector('gdg-logo').style.opacity = 1
            } else {
              this.shadowRoot.querySelector('gdg-logo').style.opacity = 0
            }
          }
        })
      }, {
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
      })
    }
  }

  reload (menu) {
    this._fetchJson(menu || 'menu/default.json', 'menu')

    Polymer.RenderStatus.afterNextRender(this, () => {
      if (this._observer) {
        this._observer.disconnect()
      }

      const page = document.querySelector('.page--on-view')
      if (page && page.nodeName.toLowerCase() === 'devfest-landing-page' && page.shadowRoot) {

        const children = page.shadowRoot.children
        this._observedObject = null

        for (var i = 0; i < children.length; i++) {
          if (children[i].getBoundingClientRect().height > 0) {
            this._observedObject = children[i]
            break;
          }
        }

        if (this._observer && this._observedObject) {
          this._observer.observe(this._observedObject)
        }
      }
    })
  }

  openDrawer () {
    window.dispatchEvent(new CustomEvent('open-drawer'))
  }
}

window.customElements.define(DevfestHeader.is, DevfestHeader)

export default DevfestHeader