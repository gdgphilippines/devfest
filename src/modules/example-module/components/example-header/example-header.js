import 'polymer/polymer-element.html'
import './example-header.html'

/**
* @polymer
* @extends HTMLElement
*/
class ExampleHeader extends Polymer.Element {
  static get is () { return 'example-header' }
}

window.customElements.define(ExampleHeader.is, ExampleHeader)
