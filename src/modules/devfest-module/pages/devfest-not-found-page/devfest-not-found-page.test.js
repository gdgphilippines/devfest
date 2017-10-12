import { expect } from 'chai'
import page from './devfest-not-found-page'

describe('Devfest not found page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-not-found-page')
		expect(el.constructor.is).to.equal('devfest-not-found-page')
	})
})