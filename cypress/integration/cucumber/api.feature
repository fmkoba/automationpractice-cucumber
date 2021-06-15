Feature: API

    3rd party API

    Scenario: API health test
    Given A request is made to the ping endpoint
    Then It should respond with a 201 status code

    Scenario: Get all bookings
    Given I make a GET request to the base bookings endpoint
    Then I should get a collection of bookings

    Scenario: Create a booking
    Given I make a POST request with an appropriate object to the bookings endpoint
    Then A booking should be created and said booking should be returned

    Scenario: Get one booking
    Given I make a GET request to the booking endpoint to fetch a specific booking
    Then The specified booking should be returned

    Scenario: Update a booking
    Given I make a PUT request to the booking endpoint with an appropriate booking object and authentication
    Then Said booking should be updated and the new information should be returned

    Scenario: Fail to delete a booking without authentication
    Given I make a DELETE request to the booking endpoint without authentication
    Then A 403 error status should be returned

    Scenario: Delete a booking with authentication
    Given I make a DELETE request to an specific booking at the booking endpoint with authentication
    Then The booking should be deleted and a 200 status code should be returned

