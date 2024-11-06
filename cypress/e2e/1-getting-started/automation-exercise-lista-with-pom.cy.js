/// <reference types="cypress" />

import cadastro from '../../pages/cadastro'
import login from '../../pages/login'
import logout from '../../pages/logout'

import { faker } from '@faker-js/faker' 

describe('Automation Exercise', () => {
  it('Test Case 1: User Registration', () => {
    cadastro.preencherFormulario()
    login.verificarNomeLogin()
  });

  it('Test Case 2: Login User with correct email and password', () => {
    cadastro.preencherFormulario()
    logout.logoutConta()
    cy.visitarHome()
    cy.contains('Signup').click()

    login.preencherLoginValido()    
    cy.clicarBotaoLogin()
        
    login.verificarNomeLogin()
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.visitarHome()

    cy.verificaTextoHome()

    cy.contains('Signup').click()

    cy.contains('h2', 'Login to your account')
      .should('be.visible')

    login.preencherLoginInvalido()
    cy.clicarBotaoLogin()
    cy.get('p')
      .should('contain', 'Your email or password is incorrect!')
  });

  it('Test Case 4: Logout User', () => {
    cy.visitarHome()
    cy.contains('Signup').click()
    login.preencherLoginValido()
    cy.clicarBotaoLogin()  
    login.verificarNomeLogin()
  
    cy.contains('Logout').click()

    cy.url()
      .should('contain', 'login')
    cy.contains("Login to your account")
      .should("be.visible");
  });

  it('Test Case 5: Register User with existing email', () => {
    cy.visitarHome()
    cy.contains('Signup').click()

    cy.get('[data-qa="signup-name"]').type(`Tester QA`)
    cy.get('[data-qa="signup-email"]').type(`tester-1721346302730@mail.com`)
    cy.contains('button', 'Signup').click()

    cy.get(`.signup-form form p`)
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  });

  it('Test Case 6: Contact Us Form', () => {
    cy.visitarHome()    
    cy.verificaTextoHome()

    cy.contains(`Contact us`).click()

    cy.get(`.contact-form h2`)
      .should('be.visible')
      .and('have.text', 'Get In Touch')

    cy.get('[data-qa="name"]').type(`Tester`)
    cy.get('[data-qa="email"]').type(`tester-qa@mail.com`)
    cy.get('[data-qa="subject"]').type(`Test Automation`)
    cy.get('[data-qa="message"]').type(`Learning Test Automation`)

    cy.fixture('example.json').as('arquivo')
    cy.get('input[name="upload_file"]').selectFile('@arquivo')

    cy.get('[data-qa="submit-button"]').click()

    cy.get('.status')
      .should('have.text', 'Success! Your details have been submitted successfully.')
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    cy.visitarHome()
    cy.contains(`Products`).click()

    cy.verificaTodosProdutos()

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)
      .first()
      .parent()
      .contains('View Product')
      .click()

    cy.get('.product-information > h2')
      .should('be.visible')
    cy.get('.product-information p')
      .should('be.visible').and('have.length', 4)
    cy.get('.product-information span span')
      .should('be.visible')
  });

  it('Test Case 9: Search Product', () => {
    cy.visitarHome()
    cy.contains(`Products`).click()

    cy.verificaTodosProdutos()

    cy.get('input#search_product').type('Shirt')
    cy.get('button#submit_search').click()

    cy.get('.title')
      .should('be.visible').and('contain', 'Searched Products')

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.visitarHome()
    cy.verificaTextoHome()

    cy.get('input#susbscribe_email')
      .scrollIntoView()
      .type('tester-qa@mail.com')
    cy.get('button#subscribe').click()

    cy.contains('You have been successfully subscribed!')
      .should('be.visible')
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    cadastro.preencherFormulario()
    login.verificarNomeLogin()
    
    cy.contains("Add to cart").click()
    cy.contains("View Cart").click()
    cy.get('.btn-default.check_out').should('be.visible')
    cy.get('.btn-default.check_out').click()
    cy.get('.heading').first() 
      .should('have.text', 'Address Details')
    cy.get('.heading').last()
      .should('have.text', 'Review Your Order')
    cy.get('.form-control').type('378 98562-8781')
    cy.get('.btn-default.check_out').click()
    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
    cy.get('[data-qa="expiry-month"]').type(12)
    cy.get('[data-qa="expiry-year"]').type(2035)
    cy.get('[data-qa="pay-button"]').click()
    cy.get('[data-qa="order-placed"]').should('be.visible')
    cy.get('[href *="delete"]').click()
    cy.get('b')
      .should('contain', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').click()
  });
});

