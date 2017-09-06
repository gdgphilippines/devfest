import 'polymer/polymer-element.html'
import './example-not-authorized-page.html'

/**
* @polymer
* @extends HTMLElement
*/
class ExampleNotAuthorizedPage extends Polymer.Element {
  static get is () { return 'example-not-authorized-page' }
}

window.customElements.define(ExampleNotAuthorizedPage.is, ExampleNotAuthorizedPage)
