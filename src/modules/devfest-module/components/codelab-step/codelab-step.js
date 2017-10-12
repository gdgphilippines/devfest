import 'polymer/polymer-element.html';
import 'shadycss/apply-shim.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import './codelab-step.html';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class CodelabStep extends Polymer.Element {
  static get is () { return 'codelab-step'; }

  static get properties () {
    return {
    };
  }
}

window.customElements.define(CodelabStep.is, CodelabStep);

export default CodelabStep;
