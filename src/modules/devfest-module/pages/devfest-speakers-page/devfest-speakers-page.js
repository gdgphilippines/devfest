import 'polymer/polymer-element.html'
import 'polymer/lib/elements/dom-repeat.html'
import 'iron-icon/iron-icon.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import '../../fonts/devfest-fonts.html'
import '../../icons/devfest-icons.html'
import '../../components/devfest-footer/devfest-footer.html'
import '../../components/devfest-button/devfest-button.html'
import './devfest-speakers-page.html'
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js'
import marked from 'marked'
window.marked = window.marked || marked

class DevfestCallForSpeakersPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-speakers-page' }

  static get properties () {
    return {
      banner: {
        type: String
      },
      perks: {
        type: Array,
        value: []
      },
      session: {
        type: Array,
        value: []
      },
      topics: {
        type: Array,
        value: []
      },
      importantDates: {
        type: Array,
        value: []
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this._fetchContent('pages/speakers.md')
  }
}

window.customElements.define(DevfestCallForSpeakersPage.is, DevfestCallForSpeakersPage)

export default DevfestCallForSpeakersPage