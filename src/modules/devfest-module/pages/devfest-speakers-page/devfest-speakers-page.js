import 'polymer/polymer-element.html'
import 'polymer/lib/elements/dom-repeat.html'
import 'iron-icon/iron-icon.html'
import 'iron-flex-layout/iron-flex-layout.html'
import 'shadycss/apply-shim.html'
import '../../fonts/devfest-fonts.html'
import '../../icons/devfest-icons.html'
import '../../components/devfest-footer/devfest-footer.html'
import '../../components/devfest-button/devfest-button.html'
import './devfest-speakers-page.html'
import marked from 'marked'

class DevfestCallForSpeakersPage extends Polymer.Element {
  static get is () { return 'devfest-speakers-page' }

  static get properties () {
    return {
      perks: {
        type: Array,
        value: []
      },
      sessions: {
        type: Array,
        value: []
      },
      topics: {
        type: Array,
        value: []
      },
      importantDates: {
        type: Array,
        value: []
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this._fetchContent()
  }

  _fetchContent () {
    fetch(`https://raw.githubusercontent.com/gdgphilippines/devfestph2017-files/old-master/content/${this.nodeName.toLowerCase()}.md`)
    .then(res => {
      return res.text()
    })
    .then(body => {
      const contentArray = body.split('-----')
      contentArray.forEach(contentBody => {
        if (contentBody.trim()) {
          try {
            const array = contentBody.split('=====')
            const query = array[0].trim().split(':')[0].trim()
            const type = array[0].trim().split(':')[1]
            const content = array[1]
            const node = this.shadowRoot.querySelector(query)
            if (type && type.trim() === 'json') {
              var prop = query
              if (!prop) throw new Error('No property found: ' + array[0])
              // console.log(content, prop, JSON.parse(content))
              this._setProperty(prop, JSON.parse(content))
              // console.log(this[prop])
            } else if (node) {
              node.innerHTML = marked(content)
            }
          } catch (e) {
            console.log(e, contentBody)
          }
        }
      })
    })
  }
}

window.customElements.define(DevfestCallForSpeakersPage.is, DevfestCallForSpeakersPage)

export default DevfestCallForSpeakersPage