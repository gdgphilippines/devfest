import { expect } from 'chai'
import page from './devfest-landing-page'

describe('Devfest landing page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-landing-page')
		expect(el.constructor.is).to.equal('devfest-landing-page')
	})
})