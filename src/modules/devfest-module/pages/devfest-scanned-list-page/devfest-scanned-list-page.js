import 'polymer/polymer-element.html';
import 'polymer/lib/elements/dom-repeat.html';
import 'iron-icon/iron-icon.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import 'marked-element/marked-element.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import '../../components/devfest-footer/devfest-footer.js';
import '../../components/devfest-button-only/devfest-button-only.js';
import User from '../../models/user-model';
import './devfest-scanned-list-page.html';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class DevfestScannedListPage extends User(contentLoaderMixin(Polymer.Element)) {
  static get is () { return 'devfest-scanned-list-page'; }

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

  reload () {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var user = this.user;
    var profile = this.profile;
    if (user && profile) {
      user.getIdToken().then(token => {
        fetch('/scanned-list-for-sponsor', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            uid: user.uid,
            company: profile.sponsorId,
            token
          })
        }).then(res => {
          return res.json();
        }).then(json => {
          if (json.success) {
            this.scanned = json.list;
          } else {
            if (Raven) {
              Raven.captureException(json);
            }
            document.querySelector('app-shell').showMessage('Error in scanning: ' + json.message, function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
          }
        });
      });
    }
    // this._fetchJson('scanned-list-for-sponsor', 'speakers', true);
  }

  _renderDate (d) {
    var date = d;
    if (typeof d === 'object' && d.value) {
      date = d.value;
    }
    var nd = new Date(date);
    return nd.toLocaleDateString() + ' - ' + nd.toLocaleTimeString();
  }
}

window.customElements.define(DevfestScannedListPage.is, DevfestScannedListPage);

export default DevfestScannedListPage;
