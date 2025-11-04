/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to clear localStorage and sessionStorage
Cypress.Commands.add('clearStorage', () => {
  cy.clearLocalStorage()
  cy.clearCookies()
})

// Custom command to wait for the page to be fully loaded
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().its('document.readyState').should('equal', 'complete')
})

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to clear localStorage and sessionStorage
       * @example cy.clearStorage()
       */
      clearStorage(): Chainable<void>

      /**
       * Custom command to wait for the page to be fully loaded
       * @example cy.waitForPageLoad()
       */
      waitForPageLoad(): Chainable<void>
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {}
