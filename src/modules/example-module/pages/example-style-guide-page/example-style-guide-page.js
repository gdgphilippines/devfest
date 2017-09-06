import 'polymer/polymer-element.html'
import './example-style-guide-page.html'

/**
* @polymer
* @extends HTMLElement
*/
class ExampleStyleGuidePage extends Polymer.Element {
  static get is () { return 'example-style-guide-page' }
}

window.customElements.define(ExampleStyleGuidePage.is, ExampleStyleGuidePage)
