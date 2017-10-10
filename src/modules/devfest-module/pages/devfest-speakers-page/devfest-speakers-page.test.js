import { expect } from 'chai'
import page from './devfest-speakers-page'

describe('Devfest speakers page', () => {

	it('should exist', () => {
		expect(page).to.exist
	})

	it('should work', () => {
		const el = document.createElement('devfest-speakers-page')
		expect(el.constructor.is).to.equal('devfest-speakers-page')
	})
})