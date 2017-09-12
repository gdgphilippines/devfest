import 'polymer/polymer.html'
import 'paper-ripple/paper-ripple.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import 'iron-icon/iron-icon.html'
import 'marked-element/marked-element.html'
import 'google-map/google-map.html'
import 'google-map/google-map-marker.html'
import 'iron-media-query/iron-media-query.html'
import '../../components/devfest-button/devfest-button.js'
import '../../components/devfest-icon-button/devfest-icon-button.js'
import '../../components/devfest-speakers-section/devfest-speakers-section.js'
import '../../components/devfest-banner/devfest-banner.js'
import '../../components/devfest-footer/devfest-footer.js'
import '../../fonts/devfest-fonts.html'
import './devfest-landing-page.html'
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js'
import marked from 'marked'
import firebaseConfig from '../../../../firebase.js'
import app from '../../../../app.js'
window.marked = window.marked || marked

class DevfestLandingPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-landing-page' }

  static get properties () {
    return {
      banner: {
        type: String
      },
      about: {
        type: String
      },
      aboutImage: {
        type: String
      },
      expect: {
        type: Array,
        value: []
      },
      speakers: {
        type: Array,
        value: []
      },
      _map: {
        type: Object,
        observer: '_setMapOptions'
      },
      _marker: {
        type: Object,
        observer: '_animateMarker'
      },
      largeMapSize: {
        type: Boolean,
        value: false
      },
      middleSizeMap: {
        type: Boolean,
        value: false
      },
      smallMapSize: {
        type: Boolean,
        value: false
      }
    }
  }

  static get observers () {
    return [
      '_setMap(largeMapSize, middleSizeMap, smallMapSize, _map)'
    ]
  }

  constructor () {
    super()
    this._apiKey = firebaseConfig[0].apiKey
    this._app = app
  }

  connectedCallback () {
    super.connectedCallback()
    this.reload()
  }

  _setMap (large, middle, small, m) {
    const map = this.shadowRoot.querySelector('.venue-section')

    if (map) {
      if (!large && !middle && !small) {
        large = window.innerWidth > 800
        small = window.innerWidth <= 600
        middle = !large && !small
      }
      if (large) {
        map.latitude = 14.536921
        map.longitude = 121.0151518
      } else if (middle) {
        map.latitude = 14.52676
        map.longitude = 121.0214175
      } else if (small) {
        map.latitude = 14.52976
        map.longitude = 121.0214175
      } else {

      }
    }
  }

  _setMapOptions (map) {
    if (map) {
      map.setOptions({
        // center: {lat: 14.536921, lng: 121.0151518},
        panControl:false,
        zoomControl:false,
        mapTypeControl:false,
        scaleControl:false,
        streetViewControl:false,
        overviewMapControl:false,
        rotateControl:false,
        scrollwheel: false,
        navigationControl: false,
        draggable: false
      })
    }
  }

  _animateMarker (marker) {
    if (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE)
    }
  }


  reload() {
    this._fetchContent('pages/landing.md')
    this._fetchJson('speakers/speakers.json', 'speakers')

    const map = this.shadowRoot.querySelector('.venue-section')
    if (map && typeof map.resize === 'function') {
      map.resize()
    }
  }



  // _shareFacebookLink () {
  //   var text = 'Let\'s attend the Grandest Technology event of the year - GDG DevFest Philippines 2017!'
  //   var link = window.location.protocol + '//' + window.location.hostname //'https://uxphilippines.com' //
  //   var linkdecoded = encodeURI(link)
  //   var picture = `${link}/images/header.png`
  //   return `https://www.facebook.com/dialog/feed?app_id=476565679402935&redirect_uri=${encodeURI('https://devfest.gdgph.org')}&link=${linkdecoded}&picture=${picture}&name=${encodeURI(text)}&caption=${encodeURI('GDG Devfest Philippines 2017')}&description=${encodeURI(text)}&display=page`

  // }

  // _shareTwitterLink () {
  //   var link = window.location.protocol + '//' + window.location.hostname
  //   var linkdecoded = encodeURI(link)
  //   var picture = `${link}/images/header.png`
  //   var text = 'Let\'s attend the Grandest Technology event of the year - GDG DevFest Philippines 2017!'
  //   return `https://twitter.com/share?text=${encodeURI(text)}&url=${encodeURI('https://devfest.gdgph.org')}&hashtags=${encodeURI('gdgph,devfest,DevFestPH')}`
  // }
}

window.customElements.define(DevfestLandingPage.is, DevfestLandingPage)

export default DevfestLandingPage