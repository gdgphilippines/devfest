import 'polymer/polymer-element.html'
import './example-landing-page.html'

/**
* @polymer
* @extends HTMLElement
*/
class ExampleLandingPage extends Polymer.Element {
  static get is () { return 'example-landing-page' }
}

window.customElements.define(ExampleLandingPage.is, ExampleLandingPage)
