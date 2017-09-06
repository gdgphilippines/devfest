import 'polymer/polymer-element.html'
import './example-authorized-page.html'

/**
* @polymer
* @extends HTMLElement
*/
class ExampleAuthorizedPage extends Polymer.Element {
  static get is () { return 'example-authorized-page' }
}

window.customElements.define(ExampleAuthorizedPage.is, ExampleAuthorizedPage)
