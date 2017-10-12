import 'polymer/polymer-element.html';
import 'polymer/lib/elements/dom-repeat.html';
import 'iron-icon/iron-icon.html';
import 'iron-flex-layout/iron-flex-layout.html';
import 'shadycss/apply-shim.html';
import 'marked-element/marked-element.html';
import '../../fonts/devfest-fonts.html';
import '../../icons/devfest-icons.html';
import '../../components/devfest-footer/devfest-footer.js';
import './devfest-scan-page.html';
import '../../components/devfest-button-only/devfest-button-only.js';
import User from '../../models/user-model';
import QrCode from 'qrcode-reader';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
window.marked = window.marked || marked;

const { Polymer, fetch, Raven, Headers } = window;

class DevfestScanPage extends User(Polymer.GestureEventListeners(contentLoaderMixin(Polymer.Element))) {
  static get is () { return 'devfest-scan-page'; }

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
        this.shadowRoot.querySelector('#video').classList.add('scanned');
        this.stopRecording();
        // console.log(result.result);
        document.querySelector('app-shell').showMessage('Scanning...', function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var user = this.user;
        var profile = this.profile;
        if (user && profile) {
          user.getIdToken().then(token => {
            fetch('/scan-id', {
              method: 'POST',
              headers,
              body: JSON.stringify({
                id: result.result,
                uid: user.uid,
                company: profile.sponsorId,
                token
              })
            }).then(res => {
              return res.json();
            }).then(json => {
              if (json.success) {
                document.querySelector('app-shell').showMessage('Scan complete', function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
              } else {
                if (Raven) {
                  Raven.captureException(json);
                }
                document.querySelector('app-shell').showMessage('Error in scanning: ' + json.message, function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
              }

              this.shadowRoot.querySelector('#video').classList.remove('scanned');
              this.reload();
            });
          });
        } else {
          document.querySelector('app-shell').showMessage('Can`\t find your user credentials', function () { document.querySelector('app-shell').closeToast(); }, 'Close', null, 10000);
          this.shadowRoot.querySelector('#video').classList.remove('scanned');
          this.reload();
        }
      }
    };

    this._boundResize = this._boundResize || this.resize.bind(this);
    window.addEventListener('resize', this._boundResize);
  }

  stopRecording () {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._stream) {
      var tracks = this._stream.getTracks();
      for (var i in tracks) {
        if (tracks[i].stop) {
          console.log(tracks[i]);
          tracks[i].stop();
        }
      }
      // console.log(this._stream)
      delete this._stream;
      var video = this.shadowRoot.querySelector('#video');
      video.src = '';
    }
  }

  goBack () {
    this.stopRecording();
    window.history.pushState({}, '', '/are-you-a-sponsor');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  connectedCallback () {
    super.connectedCallback();
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

  reload () {
    Polymer.RenderStatus.afterNextRender(this, () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.getUserMedia();
      } else {
        import(/* webpackChunkName: 'md-gum-polyfill' */ 'md-gum-polyfill').then(() => {
          console.log('loaded polyfill');
          this.getUserMedia();
        });
      }
      // Get access to the camera!
    });
  }

  getUserMedia () {
    var video = this.shadowRoot.querySelector('#video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // console.log(navigator.mediaDevices.getSupportedConstraints());
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } }).then((stream) => {
        this._stream = stream;
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
        this._stream = stream;
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
  }
}

window.customElements.define(DevfestScanPage.is, DevfestScanPage);

export default DevfestScanPage;
