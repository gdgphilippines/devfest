const expect = require('chai').expect
const shell = require('./index')

describe('App shell', () => {
  before(function(done) {
  //   // var l = document.createElement('script')
  //   // l.src = '../bower_components/webcomponentsjs/custom-elements-es5-adapter.js'
  //   // document.head.appendChild(l)

    var l2 = document.createElement('script')
    l2.src = '../../bower_components/webcomponentsjs/custom-elements-es5-adapter.js'
    document.head.appendChild(l2)

  //   document.addEventListener('WebComponentsReady', function componentsReady() {
  //     document.removeEventListener('WebComponentsReady', componentsReady, false)
  //     done()
  //   })
    done()
  })

  it('should exist', () => {
    expect(shell).to.exist
  })

  it('should work', () => {
    document.createElement('div')
    const el = document.createElement('app-shell')
    // expect(el.constructor.is).to.equal('app-shell')
  })
})