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
import './devfest-profile-page.html';
import User from '../../models/user-model';
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js';
import marked from 'marked';
window.marked = window.marked || marked;

const {Polymer} = window;

class DevfestProfilePage extends User(contentLoaderMixin(Polymer.Element)) {
  static get is () { return 'devfest-profile-page'; }

  static get properties () {
    return {

    };
  }

  static get observers () {
    return [
      '_setProfileImage(profile.image)'
    ]
  }

  connectedCallback () {
    super.connectedCallback();
    this.reload();
  }

  _setProfileImage (image) {
    console.log(image)
    this.shadowRoot.querySelector('#profile-image').style.background = `url(${image}) center/cover no-repeat`;
  }

  _getMoreLinks (providerData) {
    var providers = [
      'github.com',
      'facebook.com',
      'google.com'
    ];

    for (var i in providerData) {
      providers.splice(providers.indexOf(providerData[i].providerId), 1);
    }

    return providers.map(item => ({providerId: item}));
  }

  _getMoreLinksNumber (providerData) {
    var providers = [
      'github.com',
      'facebook.com',
      'google.com'
    ];

    for (var i in providerData) {
      providers.splice(providers.indexOf(providerData[i].providerId), 1);
    }

    return providers.length;
  }

  _getProvider (provider) {
    if (provider === 'github.com') {
      return 'github';
    } else if (provider === 'google.com') {
      return 'google';
    } else if (provider === 'facebook.com') {
      return 'facebook';
    } else {
      console.log(provider);
    }
  }

  _getProviderIcon (provider) {
    if (provider === 'github.com') {
      return 'github';
    } else if (provider === 'google.com') {
      return 'google-plus';
    } else if (provider === 'facebook.com') {
      return 'facebook';
    } else {
      console.log(provider);
    }
  }

  _getProviderName (provider) {
    if (provider === 'github.com') {
      return 'Github';
    } else if (provider === 'google.com') {
      return 'Google';
    } else if (provider === 'facebook.com') {
      return 'Facebook';
    } else {
      console.log(provider);
    }
  }

  reload () {}
}

window.customElements.define(DevfestProfilePage.is, DevfestProfilePage);

export default DevfestProfilePage;
