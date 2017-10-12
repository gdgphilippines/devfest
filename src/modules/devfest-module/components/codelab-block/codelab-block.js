import 'polymer/polymer-element.html';
import 'shadycss/apply-shim.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import './codelab-block.html';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class CodelabBlock extends Polymer.Element {
  static get is () { return 'codelab-block'; }

  static get properties () {
    return {
    };
  }
}

window.customElements.define(CodelabBlock.is, CodelabBlock);

export default CodelabBlock;
