import 'polymer/polymer-element.html';
import 'shadycss/apply-shim.html';
import 'marked-element/marked-element.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'paper-input/paper-input.html';
import 'paper-fab/paper-fab.html';
import 'paper-ripple/paper-ripple.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import './codelab-block.html';
import User from '../../models/user-model';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class CodelabBlock extends User(Polymer.Element) {
  static get is () { return 'codelab-block'; }

  static get properties () {
    return {
      page: {
        type: String,
        observer: '_pageChanged'
      },
      pages: {
        type: Array
      },
      pageId: {
        type: String
      },
      codelabId: {
        type: String
      },
      repo: {
        type: String
      }
    };
  }

  _pageChanged (page) {
    Polymer.RenderStatus.afterNextRender(this, () => {
      const markdown = this.shadowRoot.querySelectorAll('[slot=markdown-html]');
      if (markdown) {
        markdown.forEach((item) => {
          item.querySelectorAll('*').forEach((node) => {
            node.classList.add(this.nodeName.toLowerCase());
          });
        });
      }
    });
  }

  submit () {
    var repo = this.repo;

    if (repo) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var user = this.user;
      if (user) {
        user.getIdToken().then(token => {
          fetch('/submit-repo', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              repo,
              codelabId: this.codelabId,
              token
            })
          }).then(res => {
            return res.json();
          }).then(json => {
            if (json.success) {
              document.querySelector('app-shell').showMessage('Done! Calculating', () => {
                document.querySelector('app-shell').closeToast();
              }, 'Close', null, 10000);
            } else {
              if (Raven) {
                Raven.captureException(json);
              }
              document.querySelector('app-shell').showMessage('Error in submitting repository: ' + json.message, () => {
                document.querySelector('app-shell').closeToast();
              }, 'Close', null, 10000);
              // document.querySelector('app-shell').showMessage('Error in scanning: ' + json.message, function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
            }
          });
        });
      }
    } else {
      document.querySelector('app-shell').showMessage('Please put a proper repository.', () => {
        document.querySelector('app-shell').closeToast();
      }, 'Close', null, 10000);
    }
  }

  isSubmit (page) {
    return page === 'submit';
  }

  previous () {
    var page = this.pageId || 'page-01';
    var index = this.pages.findIndex(item => item.$key === page);

    if (index > 0) {
      var newPage = this.pages[index - 1];
      window.history.pushState({}, '', `/codelabs/exer/${this.codelabId}/${newPage}`);
      window.dispatchEvent(new CustomEvent('location-changed'));
    }
  }

  next () {
    var page = this.pageId || 'page-01';
    var index = this.pages.findIndex(item => item.$key === page);

    if (index < this.pages.length - 1) {
      var newPage = this.pages[index + 1];
      window.history.pushState({}, '', `/codelabs/exer/${this.codelabId}/${newPage}`);
      window.dispatchEvent(new CustomEvent('location-changed'));
    } else {
      window.history.pushState({}, '', `/codelabs/exer/${this.codelabId}/submit`);
      window.dispatchEvent(new CustomEvent('location-changed'));
    }
  }
}

window.customElements.define(CodelabBlock.is, CodelabBlock);

export default CodelabBlock;
