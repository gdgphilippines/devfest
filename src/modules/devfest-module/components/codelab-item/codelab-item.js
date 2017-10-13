import 'polymer/polymer-element.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import '../../components/devfest-button-only/devfest-button-only.js';
import User from '../../models/user-model';
import './codelab-item.html';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class CodelabItem extends User(Polymer.Element) {
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
      image: String,
      score: String
    };
  }

  static get observers () {
    return [
      '_getCodelab(codelabId, codelabTypes, user.uid, codelabTypes.splices)'
    ];
  }

  connectedCallback () {
    super.connectedCallback();
    this._getCodelab(this.codelabId, this.codelabTypes, this.user && this.user.uid);
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    if (this._codelabTitle) {
      this._codelabTitle.off();
    }

    if (this._codelabType) {
      this._codelabType.off();
    }

    if (this._codelabScore) {
      this._codelabScore.off()
    }
  }

  _getCodelab (codelabId, codelabTypes, uid) {
    if (this._codelabTitle) {
      this._codelabTitle.off();
    }

    if (this._codelabType) {
      this._codelabType.off();
    }

    if (this._codelabScore) {
      this._codelabScore.off();
    }

    this._codelabTitle = firebase.database().ref(`v1/codelabs/source/${codelabId}/primary/title`);
    this._codelabType = firebase.database().ref(`v1/codelabs/source/${codelabId}/meta/type`);

    Polymer.RenderStatus.afterNextRender(this, () => {
      if (uid) {
        this._codelabScore = firebase.database().ref(`v1/user/source/${uid}/cross/codelabs/${codelabId}/value`);

        this._codelabScore.on('value', snapshot => {
          var score = snapshot.val() || 0;
          this.score = score + ' pts';
        })
      }

      this._codelabTitle.on('value', snapshot => {
        this.title = snapshot.val();
      });

      this._codelabType.on('value', snapshot => {
        var obj = codelabTypes[codelabTypes.findIndex(item => item.$key === snapshot.val())];
        this.type = snapshot.val();
        this.image = obj ? obj.image : '';
      });
    });

  }
}
window.customElements.define(CodelabItem.is, CodelabItem);

export default CodelabItem;
