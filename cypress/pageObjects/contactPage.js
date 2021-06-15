import 'cypress-file-upload';
import {
    email,
    orderId,
    message,
} from '../fixtures/contact.json'

const Contact = {
    visit: () => {
        cy.visit('/index.php?controller=contact')
    },
    fillInput: (text) => {
        cy.get('input[name=q]').type(text)
    },
    fillContactForm: () => {
        cy.get('#id_contact').select('Webmaster')
        cy.get('#email').type(email)
        cy.get('#id_order').type(orderId)
        cy.get('#message').type(message)
    },
    submitContactForm: () => {
        cy.get('#submitMessage').click()
    },
    checkForSuccess: () => {
        cy.get('.alert-success').contains('Your message has been successfully sent to our team.')
    },
    addFile: () => {
        cy.get('#fileUpload').attachFile('file.png');
    }
}

export default Contact