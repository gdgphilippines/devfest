import 'polymer/polymer-element.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import '../../components/devfest-button-only/devfest-button-only.js';
import './codelab-item.html';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class CodelabItem extends Polymer.Element {
  static get is () { return 'codelab-item'; }

  static get properties () {
    return {
      codelabId: {
        type: String
      },
      codelabTypes: {
        type: Array,
        value: []
      },
      title: String,
      image: String
    };
  }

  static get observers () {
    return [
      '_getCodelab(codelabId, codelabTypes, codelabTypes.splices)'
    ];
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    if (this._codelabTitle) {
      this._codelabTitle.off();
    }

    if (this._codelabType) {
      this._codelabType.off();
    }
  }

  _getCodelab (codelabId, codelabTypes) {
    if (this._codelabTitle) {
      this._codelabTitle.off();
    }

    if (this._codelabType) {
      this._codelabType.off();
    }

    this._codelabTitle = firebase.database().ref(`v1/codelabs/source/${codelabId}/primary/title`);
    this._codelabType = firebase.database().ref(`v1/codelabs/source/${codelabId}/meta/type`);

    this._codelabTitle.on('value', snapshot => {
      this.title = snapshot.val();
    });

    this._codelabType.on('value', snapshot => {
      var obj = codelabTypes[codelabTypes.findIndex(item => item.$key === snapshot.val())];
      this.type = snapshot.val();
      this.image = obj ? obj.image : '';
    });
  }
}
window.customElements.define(CodelabItem.is, CodelabItem);

export default CodelabItem;
