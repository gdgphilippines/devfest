import 'polymer/polymer.html'
import './devfest-not-authorized-page.html'

class DevfestNotAuthorizedPage extends Polymer.Element {
  static get is () { return 'devfest-not-authorized-page' }
}

window.customElements.define(DevfestNotAuthorizedPage.is, DevfestNotAuthorizedPage)

export default DevfestNotAuthorizedPage