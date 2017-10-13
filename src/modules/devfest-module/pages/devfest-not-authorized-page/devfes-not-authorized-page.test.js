import { expect } from 'chai'
import page from './devfest-not-authorized-page'

describe('Devfest not authorized page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-not-authorized-page')
		expect(el.constructor.is).to.equal('devfest-not-authorized-page')
	})
})