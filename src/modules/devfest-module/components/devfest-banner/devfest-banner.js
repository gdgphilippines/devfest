import 'polymer/polymer.html'
import './devfest-banner.html'

class DevfestBanner extends Polymer.Element {
  static get is () { return 'devfest-banner' }
}

window.customElements.define(DevfestBanner.is, DevfestBanner)

export default DevfestBanner