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
import './devfest-connect-page.html';
import User from '../../models/user-model';
import QrCode from 'qrcode-reader';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer, fetch, Raven, Headers} = window;

class DevfestConnectPage extends User(contentLoaderMixin(Polymer.Element)) {
  static get is () { return 'devfest-connect-page'; }

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

  constructor () {
    super();
    this._qr = new QrCode();
    this._qr.callback = (error, result) => {
      if (error) {

      }
      if (result && result.result) {
        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }
        // console.log(result.result);
        document.querySelector('app-shell').showMessage('Scanning...', function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var user = this.user;
        if (user) {
          user.getIdToken().then(token => {
            fetch('/connect', {
              method: 'POST',
              headers,
              body: JSON.stringify({
                id: result.result,
                uid: user.uid,
                token
              })
            }).then(res => {
              return res.json();
            }).then(json => {
              if (json.success) {
                document.querySelector('app-shell').showMessage('Scan complete', function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
                window.history.pushState({}, '', '/profile');
                window.dispatchEvent(new CustomEvent('location-changed'));
              } else {
                if (Raven) {
                  Raven.captureException(json);
                }
                document.querySelector('app-shell').showMessage('Error in scanning: ' + json.message, function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
              }
            });
          });
        }
      }
    };

    this._boundResize = this._boundResize || this.resize.bind(this);
    window.addEventListener('resize', this._boundResize);
  }

  connectedCallback () {
    super.connectedCallback();

    Polymer.RenderStatus.afterNextRender(this, () => {
      var video = this.shadowRoot.querySelector('#video');
      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log(navigator.mediaDevices.getSupportedConstraints());
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } }).then((stream) => {
          video.src = window.URL.createObjectURL(stream);
          video.play();
          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }

          this._interval = setInterval(() => {
            this.scanned();
          }, 100);
          // setTimeout(function() {console.log(video.videoHeight)}, 1000)
        })
        .catch((error) => {
          console.error(error);
          return navigator.mediaDevices.getUserMedia({ video: true });
          // Raven.captureException(error)
          // this.$.toast.show(error.message, 5000);
        })
        .then((stream) => {
          video.src = window.URL.createObjectURL(stream);
          video.play();

          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }
          this._interval = setInterval(() => {
            this.scanned();
          }, 100);
        });
      }
      this.resize();
    });
    this.reload();
  }

  resize () {
    // this.$$('#uploading-dialog').center();
    var canvas = this.shadowRoot.querySelector('#canvas');
    var video = this.shadowRoot.querySelector('#video');
    var size = this.windowSize();
    if (canvas && video) {
      this.height = size.height - 240;
      this.width = size.width - 80;
      video.height = this.height;
      // video.width = this.width;
      canvas.height = this.height;
      canvas.width = this.width;
    }
  }

  windowSize () {
    var width = 0;
    var height = 0;
    if (window && document) {
      if (typeof window.innerWidth === 'number') {
        // Non-IE
        width = window.innerWidth;
        height = window.innerHeight;
      } else if (document.documentElement && (
        document.documentElement.clientWidth ||
        document.documentElement.clientHeight)) {
        // IE 6+ in 'standards compliant mode'
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        // IE 4 compatible
        width = document.body.clientWidth;
        height = document.body.clientHeight;
      }
    }
    return { width: width, height: height };
  }

  scanned () {
    // App.Shell.showMessage('Scan start', function () { App.Shell.closeToast() }, 'Close', null, 10000)
    var video = this.shadowRoot.querySelector('#video');
    var canvas = this.shadowRoot.querySelector('#canvas');
    var context = canvas.getContext('2d');

    var width2 = (video.videoWidth * this.height) / video.videoHeight;
    var height2 = (video.videoHeight * this.width) / video.videoWidth;

    if (height2 > this.height) {
      context.drawImage(video, (this.width - width2) / 2, 0, width2, this.height);
    } else {
      context.drawImage(video, 0, (this.height - height2) / 2, this.width, height2);
    }

    var dataURL = canvas.toDataURL();
    this._qr.decode(dataURL);
    // this._qr.decode(`http://localhost:5000/images/test.png`);
  }

  reload () {}
}

window.customElements.define(DevfestConnectPage.is, DevfestConnectPage);

export default DevfestConnectPage;
