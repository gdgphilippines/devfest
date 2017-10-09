import 'polymer/polymer-element.html'
import 'polymer/lib/elements/dom-repeat.html'
import 'iron-icon/iron-icon.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import 'marked-element/marked-element.html'
import '../../fonts/devfest-fonts.html'
import '../../icons/devfest-icons.html'
import '../../components/devfest-footer/devfest-footer.js'
import '../../components/devfest-button/devfest-button.js'
import './devfest-sessions-page.html'
import contentLoaderMixin from '../../../content-loader/content-loader-mixin.js'
import app from '../../../../app'
import marked from 'marked'
window.marked = window.marked || marked

class DevfestSessionsPage extends contentLoaderMixin(Polymer.Element) {
  static get is () { return 'devfest-sessions-page' }

  constructor () {
    super()
    this._app = app
  }

  connectedCallback () {
    super.connectedCallback()
    this.reload()
    console.log(document.referrer)
  }

  reload () {
    // this._fetchContent('pages/landing.md')
    this._fetchJson('speakers/speakers.json', 'speakers')
    this._fetchJson('sessions/sessions.json', 'sessions')
    this._fetchJson('sessions/sessions-type.json', 'sessionsType')
    this._fetchJson('schedule/schedule.json', 'schedule')
  }

  _getTime (start) {
    var hour = parseInt(start.substr(0, 2), 10)
    const min = parseInt(start.substr(2, 2), 10)
    hour = hour > 12 ? (hour - 12) : hour
    return min === 0 ? hour : hour + ':' + min
  }

  _getTimeArea (start) {
    return parseInt(start.substr(0, 2)) > 12 ? 'pm' : 'am'
  }

  _getTimeRange(start, end) {
    var hourStart = parseInt(start.substr(0, 2), 10)
    const minStart = parseInt(start.substr(2, 2), 10)

    var hourEnd = parseInt(end.substr(0, 2), 10)
    const minEnd = parseInt(end.substr(2, 2), 10)

    var hour = hourEnd - hourStart;
    var min = minEnd - minStart;
    return (hour * 60) + min + ' minutes';
    // return end - start < 1 && end - start > 0 ? `${(end - start) * 60} minutes` : `${end - start} hour`
  }

  _getTitle (id) {
    if (this.sessions && id && this.sessions[id]) {
      return this.sessions[id].title
    }
  }

  _getSpeaker (id) {
    if (this.sessions && id && this.sessions[id] && this.speakers) {
      if (this.speakers[this.sessions[id].speaker]) {
        return this.speakers[this.sessions[id].speaker].name
      }

      // return this.sessions[id].title
    }
  }

  _getSpeakerId (id) {
    if (this.sessions && id && this.sessions[id] && this.speakers) {
      if (this.sessions[id].speaker) {
        return this.sessions[id].speaker
      }

      // return this.sessions[id].title
    }
  }
}

window.customElements.define(DevfestSessionsPage.is, DevfestSessionsPage)

export default DevfestSessionsPage