import { Given,  Before,  Then } from 'cypress-cucumber-preprocessor/steps'
import bookingData from '../../../fixtures/client.json'
import updatedBookingData from '../../../fixtures/updatedClient.json'

let baseUrl = 'https://restful-booker.herokuapp.com/'
let authToken
let testBookingId

Before(() => {
    cy.request('POST', baseUrl + 'auth', {
        "username": 'admin',
        "password": 'password123'
    })
    .its('body')
    .then(({ token }) => {
        authToken = token
    })
})

Given('A request is made to the ping endpoint', () => {
    cy.request(baseUrl + 'ping')
        .as('ping')
})
    
Then('It should respond with a 201 status code', () => {
    cy.get('@ping')
        .its('status')
        .should('eq', 201)
})

Given('I make a GET request to the base bookings endpoint', () => {
    cy.request(baseUrl + 'booking')
      .as('bookings')
})

Then('I should get a collection of bookings', () => {
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

Given('I make a POST request with an appropriate object to the bookings endpoint', () => {
    cy.request('POST', baseUrl + 'booking', bookingData)
        .as('bookingCreation')

})

Then('A booking should be created and said booking should be returned', () => {
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

Given('I make a GET request to the booking endpoint to fetch a specific booking', () => {
    cy.request(`${baseUrl}booking/${testBookingId}`).as('booking')
})

Then('The specified booking should be returned', () => {
    cy.get('@booking')
        .its('status')
        .should('eq', 200)

    cy.get('@booking')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
})

Given('I make a PUT request to the booking endpoint with an appropriate booking object and authentication', () => {
    cy.request({
        method: 'PUT',
        url: `${baseUrl}booking/${testBookingId}`,
        headers: { Cookie: `token=${authToken}` },
        body: updatedBookingData
    }).as('put')
})

Then('Said booking should be updated and the new information should be returned', () => {
    cy.get('@put').then(({ body }) => {
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

Given('I make a DELETE request to the booking endpoint without authentication', () => {
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}booking/${testBookingId}`,
        failOnStatusCode: false,
      }).as('delete')
})

Then('A 403 error status should be returned', () => {
    cy.get('@delete')
        .then((response) => {
            expect(response.status).to.eq(403)
    })
})

Given('I make a DELETE request to an specific booking at the booking endpoint with authentication', () => {
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}booking/${testBookingId}`,
        headers: { Cookie: `token=${authToken}` }
      }).as('authDelete')
})

Then('The booking should be deleted and a 200 status code should be returned', () => {
    cy.get('@authDelete')
        .then((response) => {
            expect(response.status).to.eq(201)
    })
})
