import {
    firstName,
    lastName,
    password,
    birthDay,
    birthMonth,
    birthYear,
    company,
    address,
    city,
    state,
    zipCode,
    additionalInfo,
    phone,
    mobilePhone,
    addressAlias
} from '../fixtures/newUser.json'

var uid = (new Date().getTime()).toString(36)

const Signup = {
    visit: () => {
        cy.visit('/index.php?controller=authentication')
        cy.get('#email_create').type(`asd+${uid}@mailinator.com`)
        cy.get('#SubmitCreate').click()
    },
    fillForm: () => {
        cy.get('#customer_firstname').type(firstName)
        cy.get('#customer_lastname').type(lastName)
        cy.get('#passwd').type(password)
        cy.get('#days').select(birthDay)
        cy.get('#months').select(birthMonth)
        cy.get('#years').select(birthYear)
        cy.get('#firstname').type(firstName)
        cy.get('#lastname').type(lastName)
        cy.get('#company').type(company)
        cy.get('#address1').type(address)
        cy.get('#city').type(city)
        cy.get('#id_state').select(state)
        cy.get('#postcode').type(zipCode)
        cy.get('#other').type(additionalInfo)
        cy.get('#phone').type(phone)
        cy.get('#phone_mobile').type(mobilePhone)
        cy.get('#alias').clear().type(addressAlias)
    },
    submitForm: () => {
        cy.get('#submitAccount').click()
    },
    checkForSuccess: () => {
        cy.url().should('contain', 'my-account')
    }
}

export default Signup