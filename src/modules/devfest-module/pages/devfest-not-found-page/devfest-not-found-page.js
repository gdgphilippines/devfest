import 'polymer/polymer.html'
import './devfest-not-found-page.html'

class DevfestNotFoundPage extends Polymer.Element {
  static get is () { return 'devfest-not-found-page' }
}

window.customElements.define(DevfestNotFoundPage.is, DevfestNotFoundPage)

export default DevfestNotFoundPage