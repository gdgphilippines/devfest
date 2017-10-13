import { expect } from 'chai'
import page from './devfest-sponsors-page'

describe('Devfest sponsors page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-sponsors-page')
		expect(el.constructor.is).to.equal('devfest-sponsors-page')
	})
})