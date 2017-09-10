import 'polymer/polymer-element.html'
import 'polymer/lib/elements/dom-repeat.html'
import 'iron-icon/iron-icon.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import 'marked-element/marked-element.html'
import '../../fonts/devfest-fonts.html'
import '../../icons/devfest-icons.html'
import '../../components/devfest-footer/devfest-footer.js'
import '../../components/devfest-button/devfest-button.js'
import './devfest-tickets-page.html'
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js'
import marked from 'marked'
window.marked = window.marked || marked

class DevfestTicketsPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-tickets-page' }

  static get properties () {
    return {
      perks: {
        type: Array,
        value: []
      },
      details: {
        type: Array,
        value: []
      },
      payment: {
        type: Array,
        value: []
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this._fetchContent('pages/tickets.md')
  }
}

window.customElements.define(DevfestTicketsPage.is, DevfestTicketsPage)

export default DevfestTicketsPage