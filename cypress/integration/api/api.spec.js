/// <reference types="cypress" />
import bookingData from '../fixtures/client.json'
import updatedBookingData from '../fixtures/updatedClient.json'

let authToken
let testBookingId

before(() => {
  cy.request('POST','/auth', {
    "username": Cypress.env('username'),
    "password": Cypress.env('password')
  })
    .its('body')
    .then(({ token }) => {
      authToken = token
    })
})

describe("Test API", () => {

  it('PING - Health Check', () => {
    cy.request('/ping')
      .its('status')
      .should('eq', 201)
  })

  it('returns all bookings', () => {
    cy.request('/booking')
      .as('bookings')

    cy.get('@bookings')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')

    cy.get('@bookings')
      .its('body')
      .as('responseBody')
      .then((res) => {
        testBookingId = res[0].bookingid
        expect(res).to.be.an('array')
      })
  })    
  
  it('creates a booking', () => {
    cy.request('POST', '/booking', bookingData)
      .as('bookingCreation')

    cy.get('@bookingCreation')
      .its('body')
      .then((res) => {
        testBookingId = res.bookingid
        expect(res.booking.additionalneeds).to.be.eq(bookingData.additionalneeds)
        expect(res.booking.depositpaid).to.be.eq(bookingData.depositpaid)
        expect(res.booking.totalprice).to.be.eq(bookingData.totalprice)
        expect(res.booking.firstname).to.be.eq(bookingData.firstname)
        expect(res.booking.lastname).to.be.eq(bookingData.lastname)
        expect(res.booking.lastname).to.be.eq(bookingData.lastname)
        expect(res.booking.totalprice).to.be.eq(bookingData.totalprice)
        expect(res.booking.bookingdates.checkin).to.be.eq(bookingData.bookingdates.checkin)
        expect(res.booking.bookingdates.checkout).to.be.eq(bookingData.bookingdates.checkout)
      })
  })

  it('returns 1 booking by id', () => {
    cy.request(`/booking/${testBookingId}`).as('booking')

    cy.get('@booking')
      .its('status')
      .should('eq', 200)

    cy.get('@booking')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  it('updates a booking', () => {
    cy.request({
      method: 'PUT',
      url: `/booking/${testBookingId}`,
      headers: { Cookie: `token=${authToken}` },
      body: updatedBookingData
    }).then(({ body }) => {
      expect(body.additionalneeds).to.be.eq(updatedBookingData.additionalneeds)
      expect(body.depositpaid).to.be.eq(updatedBookingData.depositpaid)
      expect(body.totalprice).to.be.eq(updatedBookingData.totalprice)
      expect(body.firstname).to.be.eq(updatedBookingData.firstname)
      expect(body.lastname).to.be.eq(updatedBookingData.lastname)
      expect(body.lastname).to.be.eq(updatedBookingData.lastname)
      expect(body.totalprice).to.be.eq(updatedBookingData.totalprice)
      expect(body.bookingdates.checkin).to.be.eq(updatedBookingData.bookingdates.checkin)
      expect(body.bookingdates.checkout).to.be.eq(updatedBookingData.bookingdates.checkout)
    })
  })

  it('fails to delete a booking without auth', () => {
    cy.request({
      method: 'DELETE',
      url: `/booking/${testBookingId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403)
    })
  })

  it('deletes a booking', () => {
    cy.request({
      method: 'DELETE',
      url: `/booking/${testBookingId}`,
      headers: { Cookie: `token=${authToken}` }
    })
  })
})