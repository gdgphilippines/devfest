import 'polymer/polymer-element.html'
import 'polymer/lib/elements/dom-repeat.html'
import 'iron-icon/iron-icon.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import 'marked-element/marked-element.html'
import '../../fonts/devfest-fonts.html'
import '../../icons/devfest-icons.html'
import '../../components/devfest-speakers-section/devfest-speakers-section.js'
import '../../components/devfest-footer/devfest-footer.js'
import '../../components/devfest-button/devfest-button.js'
import './devfest-speakers-page.html'
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js'
import marked from 'marked'
window.marked = window.marked || marked

class DevfestSpeakersPage extends contentLoaderMixin(Polymer.Element) {
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
    this.reload()
  }

  reload() {
    // this._fetchContent('pages/landing.md')
    this._fetchJson('speakers/speakers.json', 'speakers')
  }
}

window.customElements.define(DevfestSpeakersPage.is, DevfestSpeakersPage)

export default DevfestSpeakersPage