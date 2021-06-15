import { Given,  When,  Then } from 'cypress-cucumber-preprocessor/steps'
import {
    visit,
    fillContactForm,
    addFile,
    submitContactForm,
    checkForSuccess ,
} from '../../../pageObjects/contactPage'

Given('I am at the contact page', () => {
    visit()
})

When('I fill the contact form and attach a file', () => {
    fillContactForm()
    addFile()
})

Then('I should be able to submit the contact form', () => {
    submitContactForm()
    checkForSuccess()
})
