const expect = require('chai').expect
const shell = require('./index')
// const page = require('./../../src/modules/devfest-module/pages/devfest-landing-page/devfest-landing-page')

describe('App shell', () => {

  it('should exist', () => {
    expect(shell).to.exist
  })

  it('should work', () => {
    document.createElement('div')
    const el = document.createElement('app-shell')
    expect(el.constructor.is).to.equal('app-shell')
  })
})

// describe('Devfest landing page', () => {

//   it('should exist', () => {
//     expect(page).to.exist
//   })

//   it('should work', () => {
//     document.createElement('div')
//     const el = document.createElement('devfest-landing-page')
//     expect(el.constructor.is).to.equal('devfest-landing-page')
//   })
// })