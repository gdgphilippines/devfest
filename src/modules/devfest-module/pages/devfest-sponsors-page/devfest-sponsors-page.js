import 'polymer/polymer.html';
import 'paper-ripple/paper-ripple.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import 'iron-icon/iron-icon.html';
import 'marked-element/marked-element.html';
import '../../fonts/devfest-fonts.html';
import './devfest-sponsors-page.html';
import '../../components/devfest-footer/devfest-footer.js';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
import app from '../../../../app.js';
window.marked = window.marked || marked;
const {Polymer} = window;

class DevfestSponsorsPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-sponsors-page'; }

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
    };
  }

  constructor () {
    super();
    this._app = app;
  }

  connectedCallback () {
    super.connectedCallback();
    this.reload();
  }

  reload () {
    this._fetchContent('pages/sponsors.md');
  }
}

window.customElements.define(DevfestSponsorsPage.is, DevfestSponsorsPage);

export default DevfestSponsorsPage;
