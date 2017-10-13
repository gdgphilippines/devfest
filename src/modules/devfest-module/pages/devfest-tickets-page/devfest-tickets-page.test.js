import { expect } from 'chai'
import page from './devfest-tickets-page'

describe('Devfest tickets page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-tickets-page')
		expect(el.constructor.is).to.equal('devfest-tickets-page')
	})
})