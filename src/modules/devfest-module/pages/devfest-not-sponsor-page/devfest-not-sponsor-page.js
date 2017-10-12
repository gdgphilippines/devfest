import 'polymer/polymer-element.html';
import 'polymer/lib/elements/dom-repeat.html';
import 'iron-icon/iron-icon.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import 'marked-element/marked-element.html';
import 'paper-input/paper-input.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import '../../components/devfest-footer/devfest-footer.js';
import '../../components/devfest-button-only/devfest-button-only.js';
import './devfest-not-sponsor-page.html';
import User from '../../models/user-model';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer, fetch, Headers, Raven} = window;

class DevfestNotSponsorPage extends User(contentLoaderMixin(Polymer.Element)) {
  static get is () { return 'devfest-not-sponsor-page'; }

  static get properties () {
    return {
      verificationCode: {
        type: String
      },
      companyId: {
        type: String
      }
    };
  }

  connectedCallback () {
    super.connectedCallback();
    this.reload();
  }

  reload () {}

  verify () {
    var validate = this.verificationCode;
    var company = this.companyId;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var user = this.user;
    if (user && validate) {
      user.getIdToken().then(token => {
        fetch('/validate-sponsor', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            token,
            validate,
            company
          })
        }).then(res => {
          return res.json();
        }).then(json => {
          if (json.success) {
            document.querySelector('app-shell').showMessage('Validation successful', function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
          } else {
            if (Raven) {
              Raven.captureException(json);
            }
            document.querySelector('app-shell').showMessage('Cannot validate your company', function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
          }
        });
      });
    }
  }
}

window.customElements.define(DevfestNotSponsorPage.is, DevfestNotSponsorPage);

export default DevfestNotSponsorPage;
