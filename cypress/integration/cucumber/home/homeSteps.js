import { Given,  When,  Then } from 'cypress-cucumber-preprocessor/steps'
import { visit, searchForItem, checkForSearchSuccess } from '../../../pageObjects/homePage'

Given('I am at the home page', () => {
    visit()
})

When('I seach for an item', () => {
    searchForItem()
})

Then('I should see a results page for that search', () => {
    checkForSearchSuccess()
})
