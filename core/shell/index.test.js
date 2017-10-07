const expect = require('chai').expect
const shell = require('./index')

describe('App shell', () => {

  it('should exist', () => {
    expect(shell).to.exist
  })

  it('should work', () => {
    const el = document.createElement('app-shell')
    expect(el.constructor.is).to.equal('app-shell')
  })
})
