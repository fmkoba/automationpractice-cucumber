import { Given,  When,  Then } from 'cypress-cucumber-preprocessor/steps'
import { visit, fillForm, submitForm, checkForSuccess } from '../../../pageObjects/signupPage'

Given('I am at the  signup page', () => {
    visit()
})

When('I submit the signup form', () => {
    fillForm()
    submitForm()
})

Then('I should see the user page', () => {
    checkForSuccess()
})
