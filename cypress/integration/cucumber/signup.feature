Feature: Signup feature

    As a new user
    I want to sign up for the application

    Scenario: Valid Signup
    Given I am at the  signup page
    When I submit the signup form
    Then I should see the user page
