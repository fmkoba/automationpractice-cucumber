import { Given,  When,  Then } from 'cypress-cucumber-preprocessor/steps'
import {
    visit,
    fillForm,
    incorrectlyFillForm,
    submitForm,
    checkForSuccess,
    checkForFailure
} from '../../../pageObjects/loginPage'

Given('I open the login page', () => {
    visit()
})

When('I submit login', () => {
    fillForm()
    submitForm()
})

When('I submit an invalid login', () => {
    incorrectlyFillForm()
    submitForm()
})

Then('I should see the home page', () => {
    checkForSuccess()
})

Then('I should see an error message', () => {
    checkForFailure()
})