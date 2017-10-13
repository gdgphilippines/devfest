import 'polymer/polymer.html'
import 'paper-spinner/paper-spinner.html'
import './devfest-not-authorized-page.html'

class DevfestNotAuthorizedPage extends Polymer.Element {
  static get is () { return 'devfest-not-authorized-page' }

  static get properties () {
    return {
      unauthorized: {
        type: Boolean,
        value: false
      }
    }
  }

  connectedCallback () {
    super.connectedCallback();
    setTimeout(() => {
      this.unauthorized = true;
    }, 10000);
  }
}

window.customElements.define(DevfestNotAuthorizedPage.is, DevfestNotAuthorizedPage)

export default DevfestNotAuthorizedPage