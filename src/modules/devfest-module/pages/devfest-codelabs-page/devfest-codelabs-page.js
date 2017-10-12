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
import './devfest-codelabs-page.html';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class DevfestCodelabsPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-codelabs-page'; }

  static get properties () {
    return {
      codelabs: {
        type: Array
      },
      codelabType: {
        type: String,
        value: 'all'
      }
    };
  }

  static get observers () {
    return [
      '_changeListCodelab(codelabType, params.id, params.page)'
    ];
  }

  connectedCallback () {
    super.connectedCallback();
    this.reload();
  }

  _changeListCodelab (codelabType, id, page) {
    console.log(codelabType, id, page)
    if (this._codelabs) {
      this._codelabs.off();
    }

    if (codelabType === 'done') {

    } if (codelabType === 'exer') {

    } else {
      this._codelabs = firebase.database().ref(`v1/codelabs/query/${codelabType}`)
      this._codelabs.on('value', (snapshot) => {
        var list = [];
        snapshot.forEach(child => {
          list.push({
            $key: child.key
          });
        });
        this.codelabs = list;
      });
    }
  }

  reload () {}
}

window.customElements.define(DevfestCodelabsPage.is, DevfestCodelabsPage);

export default DevfestCodelabsPage;
