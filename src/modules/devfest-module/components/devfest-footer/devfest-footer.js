import 'polymer/polymer-element.html'
import 'polymer/lib/elements/dom-repeat.html'
import '../gdg-logo/gdg-logo.js'
import '../../icons/devfest-icons.html'
import '../../fonts/devfest-fonts.html'
import './devfest-footer.html'

class DevfestFooter extends Polymer.Element {
  static get is () { return 'devfest-footer' }

  static get properties () {
    return {
      footerLinks: {
        type: Array,
        value: [
          {
            href: 'https://www.gdgph.org/#/community/guidelines',
            text: 'Code of Conduct'
          },
          {
            href: '#',
            text: '#GDGPH'
          },
          {
            href: '#',
            text: '#Devfest17'
          }
        ]
      },
      contactUs: {
        type: Array,
        value: [
          {
            icon: 'devfest:google-plus',
            href: 'https://plus.google.com/105750470224587854845'
          },
          {
            icon: 'devfest:facebook',
            href: 'https://www.facebook.com/gdgphilippines'
          },
          {
            icon: 'devfest:twitter',
            href: 'https://twitter.com/gdgphilippines'
          },
          {
            icon: 'devfest:youtube',
            href: 'https://www.youtube.com/channel/UCT9dkGk7ti1ok-JPUbXjTCg'
          },
          {
            icon: 'devfest:instagram',
            href: 'https://www.instagram.com/gdgphilippines/'
          }
        ]
      }
    }
  }
}

window.customElements.define(DevfestFooter.is, DevfestFooter)

export default DevfestFooter