import 'polymer/polymer-element.html'
import './example-not-found-page.html'

/**
* @polymer
* @extends HTMLElement
*/
class ExampleNotFoundPage extends Polymer.Element {
  static get is () { return 'example-not-found-page' }
}

window.customElements.define(ExampleNotFoundPage.is, ExampleNotFoundPage)
