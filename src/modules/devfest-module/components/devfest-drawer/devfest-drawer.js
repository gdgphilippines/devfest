import 'polymer/polymer.html'
import 'polymer/lib/mixins/gesture-event-listeners.html'
import 'app-layout/app-header/app-header.html'
import 'app-layout/app-toolbar/app-toolbar.html'
import 'app-layout/app-drawer/app-drawer.html'
import '../devfest-button/devfest-button.js'
import '../gdg-logo/gdg-logo.js'
import './devfest-drawer.html'

class DevfestDrawer extends Polymer.GestureEventListeners(Polymer.Element) {
  static get is () { return 'devfest-drawer' }

  constructor () {
    super()
    this._boundOpenDrawer = this.openDrawer.bind(this)
  }

  connectedCallback () {
    super.connectedCallback()
    window.addEventListener('open-drawer', this._boundOpenDrawer)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    window.removeEventListener('open-drawer', this._boundOpenDrawer)
  }

  openDrawer () {
    this.shadowRoot.querySelector('app-drawer').open()
  }

  closeDrawer () {
    this.shadowRoot.querySelector('app-drawer').close()
  }
}

window.customElements.define(DevfestDrawer.is, DevfestDrawer)