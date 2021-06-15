const Home = {
    visit: () => {
        cy.visit('/index.php')
    },
    searchForItem: () => {
        cy.get('#search_query_top').type('blouse{enter}')

    },
    checkForSearchSuccess: () => {
        cy.url().should('contain', 'search_query=blouse')
        cy.get('h1.product-listing .lighter').contains('blouse', { matchCase: false })
    }
}

export default Home