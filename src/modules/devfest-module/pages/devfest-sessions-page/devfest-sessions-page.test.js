import { expect } from 'chai'
import page from './devfest-sessions-page'

describe('Devfest sessions page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-sessions-page')
		expect(el.constructor.is).to.equal('devfest-sessions-page')
	})
})