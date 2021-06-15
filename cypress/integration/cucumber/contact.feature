Feature: Contact Page

    As a regular user
    I want to submit the contact form

    Scenario: Submission with a file
    Given I am at the contact page
    When I fill the contact form and attach a file
    Then I should be able to submit the contact form