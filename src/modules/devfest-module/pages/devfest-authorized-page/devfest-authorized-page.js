import 'polymer/polymer.html'
import './devfest-authorized-page.html'

class DevfestAuthorizedPage extends Polymer.Element {
  static get is () { return 'devfest-authorized-page' }
}

window.customElements.define(DevfestAuthorizedPage.is, DevfestAuthorizedPage)

export default DevfestAuthorizedPage