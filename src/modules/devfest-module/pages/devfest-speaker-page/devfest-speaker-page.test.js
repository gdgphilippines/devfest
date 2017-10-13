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

	it('back button should exist', () => {
		const el = document.createElement('devfest-speaker-page')
		const ret = el.shadowRoot.querySelector("section.back-section devfest-button[href='/speakers']")
		expect(ret).to.exist
	})
})