import 'polymer/polymer-element.html'
import 'polymer/lib/elements/dom-if.html'
import '../../fonts/devfest-fonts.html'
import './gdg-logo.html'

class GDGLogo extends Polymer.Element {
  static get is () { return 'gdg-logo' }

  static get properties () {
    return {
      grey: {
        type: Boolean,
        value: false
      },
      colored: {
        type: Boolean,
        value: false
      },
      mono: {
        type: Boolean,
        value: false
      },
      href: {
        type: String,
        value: '/'
      }
    }
  }

}

window.customElements.define(GDGLogo.is, GDGLogo)

export default GDGLogo