const Login = {
    visit: () => {
        cy.visit('/index.php')
        cy.get('#header').contains('Sign in').click()
    },
    fillForm: () => {
        cy.get('#email').type('asd@mailinator.com')
        cy.get('#passwd').type('password')
    },
    incorrectlyFillForm: () => {
        cy.get('#email').type('asd@mailinator.com')
        cy.get('#passwd').type('11111')
    },
    submitForm: () => {
        cy.get('#SubmitLogin').click()
    },
    checkForSuccess: () => {
        cy.url().should('contain', 'my-account')
    },
    checkForFailure: () => {
        cy.get('.alert-danger').contains('Authentication failed.')
    }
}

export default Login