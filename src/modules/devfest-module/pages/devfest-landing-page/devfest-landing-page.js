import 'polymer/polymer.html'
import 'paper-ripple/paper-ripple.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import 'iron-icon/iron-icon.html'
import 'marked-element/marked-element.html'
import '../../components/devfest-button/devfest-button.js'
import '../../components/devfest-icon-button/devfest-icon-button.js'
import '../../components/devfest-speakers-section/devfest-speakers-section.js'
import '../../components/devfest-banner/devfest-banner.js'
import '../../components/devfest-footer/devfest-footer.js'
import '../../fonts/devfest-fonts.html'
import './devfest-landing-page.html'
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js'
import marked from 'marked'
window.marked = window.marked || marked

class DevfestLandingPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-landing-page' }

  static get properties () {
    return {
      banner: {
        type: String
      },
      about: {
        type: String
      },
      aboutImage: {
        type: String
      },
      expect: {
        type: Array,
        value: []
      },
      speakers: {
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
    this._fetchContent('pages/landing.md')
    this._fetchJson('speakers/speakers.json', 'speakers')
  }



  // _shareFacebookLink () {
  //   var text = 'Let\'s attend the Grandest Technology event of the year - GDG DevFest Philippines 2017!'
  //   var link = window.location.protocol + '//' + window.location.hostname //'https://uxphilippines.com' //
  //   var linkdecoded = encodeURI(link)
  //   var picture = `${link}/images/header.png`
  //   return `https://www.facebook.com/dialog/feed?app_id=476565679402935&redirect_uri=${encodeURI('https://devfest.gdgph.org')}&link=${linkdecoded}&picture=${picture}&name=${encodeURI(text)}&caption=${encodeURI('GDG Devfest Philippines 2017')}&description=${encodeURI(text)}&display=page`

  // }

  // _shareTwitterLink () {
  //   var link = window.location.protocol + '//' + window.location.hostname
  //   var linkdecoded = encodeURI(link)
  //   var picture = `${link}/images/header.png`
  //   var text = 'Let\'s attend the Grandest Technology event of the year - GDG DevFest Philippines 2017!'
  //   return `https://twitter.com/share?text=${encodeURI(text)}&url=${encodeURI('https://devfest.gdgph.org')}&hashtags=${encodeURI('gdgph,devfest,DevFestPH')}`
  // }
}

window.customElements.define(DevfestLandingPage.is, DevfestLandingPage)

export default DevfestLandingPage