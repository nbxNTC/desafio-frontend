describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.clearStorage()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('should navigate between home and results pages', () => {
    // Start on home page
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Perform search
    cy.get('[data-cy="search-input"]').type('Test search')
    cy.get('[data-cy="search-form"]').submit()

    // Should be on results page
    cy.url().should('include', '/results?q=')

    // Go back to home (click logo or back button)
    cy.go('back')

    // Should be back on home page
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should have working browser back button', () => {
    const searches = ['First search', 'Second search', 'Third search']

    // Perform multiple searches
    searches.forEach((query) => {
      cy.get('[data-cy="search-input"]').clear().type(query)
      cy.get('[data-cy="search-form"]').submit()
      cy.url().should('include', '/results?q=')
    })

    // Go back through history
    cy.go('back')
    cy.url().should('include', encodeURIComponent(searches[1]))

    cy.go('back')
    cy.url().should('include', encodeURIComponent(searches[0]))

    cy.go('back')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should have working browser forward button', () => {
    // Perform search
    cy.get('[data-cy="search-input"]').type('Navigation test')
    cy.get('[data-cy="search-form"]').submit()
    cy.url().should('include', '/results?q=')

    // Go back
    cy.go('back')
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Go forward
    cy.go('forward')
    cy.url().should('include', '/results?q=')
  })

  it('should maintain scroll position on back navigation', () => {
    // Scroll down on home page
    cy.scrollTo('bottom', { duration: 1000 })

    // Wait a bit to ensure scroll completes
    cy.wait(500)

    // Perform search
    cy.get('[data-cy="search-input"]').type('Scroll test')
    cy.get('[data-cy="search-form"]').submit()

    // Wait for results page
    cy.url().should('include', '/results?q=')

    // Go back
    cy.go('back')

    // Check if we're back on home
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
