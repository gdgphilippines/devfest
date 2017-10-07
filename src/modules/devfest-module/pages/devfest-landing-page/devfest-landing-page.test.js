const expect = require('chai').expect
const page = require('./devfest-landing-page')

discribe('Devfest landing page', () => {
	
	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		document.createElement('div')
		const el = document.createElement('devfest-landing-page')
		expect(el.constructor.is).to.equal('devfest-landing-page')
	})
})