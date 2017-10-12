import 'polymer/polymer-element.html';
import 'polymer/lib/elements/dom-repeat.html';
import 'iron-icon/iron-icon.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import 'marked-element/marked-element.html';
import '../../components/codelab-item/codelab-item.js';
import '../../components/codelab-block/codelab-block.js';
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
      },
      codelabTypes: {
        type: Array
      },
      pages: {
        type: Array
      },
      page: {
        type: String
      }
    };
  }

  static get observers () {
    return [
      '_changeListCodelab(codelabType, params.id, params.page, user.uid)',
      '_changeCodeLabType(params.type)'
    ];
  }

  connectedCallback () {
    super.connectedCallback();
    this.reload();
    if (this._codelabTypes) {
      this._codelabTypes.off();
    }

    this._codelabTypes = firebase.database().ref(`v1/codelabtype/source`)
    this._codelabTypes.on('value', snapshot => {
      var list = [];
      snapshot.forEach(child => {
        list.push({
          $key: child.key,
          image: child.val().primary.image,
          title: child.val().primary.title
        });
      });
      this.codelabTypes = list;
    });
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    if (this._codelabs) {
      this._codelabs.off();
    }

    if (this._codelabPages) {
      this._codelabPages.off();
    }

    if (this._codelabPage) {
      this._codelabPage.off();
    }

    if (this._codelabTitle) {
      this._codelabTitle.off();
    }

    if (this._codelabType) {
      this._codelabType.off();
    }
  }

  _changeCodeLabType (type) {
    console.log(type)
    this.codelabType = type || 'all';
  }

  _changeListCodelab (codelabType, id, page, uid) {
    if (this._codelabs) {
      this._codelabs.off();
    }

    if (this._codelabPages) {
      this._codelabPages.off();
    }

    if (this._codelabPage) {
      this._codelabPage.off();
    }

    if (this._codelabTitle) {
      this._codelabTitle.off();
    }

    if (this._codelabType) {
      this._codelabType.off();
    }

    if (codelabType === 'done' && uid) {
      this._codelabs = firebase.database().ref(`v1/user/source/${uid}/cross/codelabs`);
      this._codelabs.on('value', (snapshot) => {
        var list = [];
        snapshot.forEach(child => {
          list.push({
            $key: child.key
          });
        });
        this.codelabs = list;
      });
    } else if (codelabType === 'exer' && id) {

      this._codelabPages = firebase.database().ref(`v1/codelabs/source/${id}/primary/pages`);
      this._codelabPages.on('value', snapshot => {
        var list = [];
        snapshot.forEach(child => {
          list.push({
            $key: child.key,
            title: child.val().title,
            value: child.val().value
          });
        });
        this.pages = list;
      });

      this._codelabTitle = firebase.database().ref(`v1/codelabs/source/${id}/primary/title`);
      this._codelabTitle.on('value', snapshot => {
        this.codelabTitle = snapshot.val();
      });

      this._codelabType = firebase.database().ref(`v1/codelabs/source/${id}/meta/type`);
      this._codelabType.on('value', snapshot => {
        this.codelabTypePage = snapshot.val();
      });

      page = page || 'page-01';

      this._codelabPage = firebase.database().ref(`v1/codelabs/source/${id}/primary/pageContent/${page}/value`);
      this._codelabPage.on('value', snapshot => {
        this.page = snapshot.val();
      });

    } else {
      if (codelabType === 'exer' || codelabType === 'done') {
        codelabType = 'all';
      }
      this._codelabs = firebase.database().ref(`v1/codelabs/query/${codelabType}`);
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
