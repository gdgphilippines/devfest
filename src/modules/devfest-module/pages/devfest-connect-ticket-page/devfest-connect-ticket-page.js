import 'polymer/polymer-element.html';
import 'polymer/lib/elements/dom-repeat.html';
import 'iron-icon/iron-icon.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import 'marked-element/marked-element.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import '../../components/devfest-footer/devfest-footer.js';
import '../../components/devfest-button/devfest-button.js';
import './devfest-connect-ticket-page.html';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class DevfestConnectTicketPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-connect-ticket-page'; }

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

window.customElements.define(DevfestConnectTicketPage.is, DevfestConnectTicketPage);

export default DevfestConnectTicketPage;
