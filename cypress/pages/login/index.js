class Login {

    verificarNomeLogin(){
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
    }

    preencherLoginValido(){
        cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com')
        cy.get('[data-qa="login-password"]').type('12345', { log: false })
    }

    preencherLoginInvalido(){
        cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com')
        cy.get('[data-qa="login-password"]').type('54321')      
    }
}

export default new Login()