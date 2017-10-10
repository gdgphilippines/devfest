import 'polymer/polymer-element.html';
import 'polymer/lib/elements/dom-repeat.html';
import 'iron-icon/iron-icon.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
// import 'paper-button/paper-button.html';
import 'marked-element/marked-element.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import '../../components/devfest-footer/devfest-footer.js';
import '../../components/devfest-button-only/devfest-button-only.js';
import './devfest-login-page.html';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import User from '../../models/user-model';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class DevfestLoginPage extends User(Polymer.GestureEventListeners(contentLoaderMixin(Polymer.Element))) {
  static get is () { return 'devfest-login-page'; }

  static get properties () {
    return {
      perks: {
        type: Array,
        value: []
      },
      details: {
        type: Array,
        value: []
      },
      payment: {
        type: Array,
        value: []
      }
    };
  }

  connectedCallback () {
    super.connectedCallback();
    this.reload();
  }

  reload () {}
}

window.customElements.define(DevfestLoginPage.is, DevfestLoginPage);

export default DevfestLoginPage;
