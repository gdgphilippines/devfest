import 'polymer/polymer.html'
import 'paper-ripple/paper-ripple.html'
import './devfest-button.html'

class DevfestButton extends Polymer.Element {
  static get is () { return 'devfest-button' }

  static get properties () {
    return {
      href: {
        type: String,
        value: '#'
      },
      isBig: {
        type: Boolean,
        value: false
      },
      target: {
        type: String
      },
      noColor: {
        type: Boolean,
        value: false
      },
      disable: {
        type: Boolean,
        value: false
      }
    }
  }

  _isBig (isBig) {
    return isBig ? 'button__big' : ''
  }

  _noColor (noColor) {
    return noColor ? 'button__no-color' : ''
  }

  _getHref (href, disable) {
    return disable ? '#' : href
  }

  _disabled(disable) {
    return disable ? 'disable' : ''
  }
}

window.customElements.define(DevfestButton.is, DevfestButton)

export default DevfestButton