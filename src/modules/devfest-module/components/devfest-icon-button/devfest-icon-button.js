import 'polymer/polymer-element.html'
import 'paper-ripple/paper-ripple.html'
import 'iron-icon/iron-icon.html'
import '../../icons/devfest-icons.html'
import './devfest-icon-button.html'

class DevfestIconButton extends Polymer.Element {
  static get is () { return 'devfest-icon-button' }

  static get properties () {
    return {
      href: {
        type: String,
        value: ''
      },
      icon: {
        type: String
      },
      target: {
        type: String
      },
      isWhite: {
        type: Boolean,
        value: false
      }
    }
  }

  _isWhite (isWhite) {
    return isWhite ? 'icon-button__white' : ''
  }
}

window.customElements.define(DevfestIconButton.is, DevfestIconButton)

export default DevfestIconButton