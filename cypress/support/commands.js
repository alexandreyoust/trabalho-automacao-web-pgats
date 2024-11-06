// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clicarBotaoLogin', () => {
    cy.get('[data-qa="login-button"]').click()
})

Cypress.Commands.add('visitarHome', () => {
    cy.visit('https://automationexercise.com')
})

Cypress.Commands.add('verificaTextoHome', () => {
    cy.contains('h2', 'Full-Fledged practice website for Automation Engineers')
        .should('be.visible')
})

Cypress.Commands.add('verificaTodosProdutos', () => {
    cy.url().should('contain', 'products')
    cy.get('.title')
      .should('be.visible')
      .and('contain', 'All Products')
})