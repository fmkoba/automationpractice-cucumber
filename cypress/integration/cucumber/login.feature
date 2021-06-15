Feature: Login page
    As a valid user
    I want to log in into the application

    Scenario: Valid Login
    Given I open the login page
    When I submit login
    Then I should see the home page

    Scenario: Invalid Login
    Given I open the login page
    When I submit an invalid login
    Then I should see an error message
    