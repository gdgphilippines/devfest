import { expect } from 'chai'
import page from './devfest-session-page'

describe('Devfest session page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-session-page')
		expect(el.constructor.is).to.equal('devfest-session-page')
	})
})