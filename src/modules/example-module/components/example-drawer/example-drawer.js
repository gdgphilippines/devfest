import 'polymer/polymer-element.html'
import './example-drawer.html'

/**
* @polymer
* @extends HTMLElement
*/
class ExampleDrawer extends Polymer.Element {
  static get is () { return 'example-drawer' }
}

window.customElements.define(ExampleDrawer.is, ExampleDrawer)
