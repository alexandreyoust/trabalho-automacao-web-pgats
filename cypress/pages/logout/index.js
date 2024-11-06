class Logout {
    
    logoutConta(){
        cy.get('.fa.fa-user')
            .parent()
            .should('be.visible')
            .and('contain.text', 'Logged in as')
            .and('contain.text', 'Tester QA');

        cy.get('[class="fa fa-trash-o"]').click()

        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    }
    
}

export default new Logout()