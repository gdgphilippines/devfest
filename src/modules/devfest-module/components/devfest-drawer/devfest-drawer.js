import 'polymer/polymer.html';
import 'polymer/lib/mixins/gesture-event-listeners.html';
import 'app-layout/app-header/app-header.html';
import 'app-layout/app-toolbar/app-toolbar.html';
import 'app-layout/app-drawer/app-drawer.html';
import '../devfest-button/devfest-button.js';
import '../gdg-logo/gdg-logo.js';
import './devfest-drawer.html';
import User from '../../models/user-model';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';

const {Polymer} = window;

class DevfestDrawer extends User(contentLoaderMixin(Polymer.GestureEventListeners(Polymer.Element))) {
  static get is () { return 'devfest-drawer'; }

  static get properties () {
    return {
      menu: {
        type: Array
      }
    };
  }

  constructor () {
    super();
    this._boundOpenDrawer = this.openDrawer.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();
    this.reload();
    window.addEventListener('open-drawer', this._boundOpenDrawer);
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    window.removeEventListener('open-drawer', this._boundOpenDrawer);
  }

  reload (menu) {
    this._fetchJson(menu || 'menu/default.json', 'menu');
  }

  openDrawer () {
    this.shadowRoot.querySelector('app-drawer').open();
  }

  closeDrawer () {
    this.shadowRoot.querySelector('app-drawer').close();
  }
}

window.customElements.define(DevfestDrawer.is, DevfestDrawer);
