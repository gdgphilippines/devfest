import 'polymer/polymer-element.html'
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

class DevfestHeader extends Polymer.GestureEventListeners(Polymer.Element) {
  static get is () { return 'devfest-header' }

  openDrawer () {
    window.dispatchEvent(new CustomEvent('open-drawer'))
  }
}

window.customElements.define(DevfestHeader.is, DevfestHeader)

export default DevfestHeader