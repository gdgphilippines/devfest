import { expect } from 'chai'
import page from './devfest-speaker-page'

describe('Devfest speaker page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-speaker-page')
		expect(el.constructor.is).to.equal('devfest-speaker-page')
	})
})