import 'polymer/polymer-element.html';
import 'shadycss/apply-shim.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import './codelab-item.html';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class CodelabItem extends Polymer.Element {
  static get is () { return 'codelab-item'; }

  static get properties () {
    return {
    };
  }
}

window.customElements.define(CodelabItem.is, CodelabItem);

export default CodelabItem;
