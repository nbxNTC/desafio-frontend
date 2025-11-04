describe('Search Functionality E2E Tests', () => {
  beforeEach(() => {
    // Clear storage before each test
    cy.clearStorage()

    // Visit home page
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('should perform a basic search', () => {
    const searchQuery = 'JavaScript tutorial'

    // Type in search box
    cy.get('[data-cy="search-input"]').type(searchQuery)

    // Submit search
    cy.get('[data-cy="search-form"]').submit()

    // Wait for navigation to results page
    cy.url().should('include', '/results?q=')
    cy.url().should('include', encodeURIComponent(searchQuery))

    // Check if results page shows the query
    cy.contains(`Search results for "${searchQuery}"`, { timeout: 10000 }).should('be.visible')
  })

  it('should display search results', () => {
    const searchQuery = 'React hooks'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Wait for results to load
    cy.contains('Search results for', { timeout: 10000 }).should('be.visible')

    // Check if video cards are displayed
    cy.get('[data-cy="video-card"]').should('have.length.greaterThan', 0)
  })

  it('should show "no results" message for invalid search', () => {
    const searchQuery = 'xyzabc123456789notfound'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Should show no results message
    cy.contains(/no results found/i, { timeout: 10000 }).should('be.visible')
  })

  it('should clear search input', () => {
    const searchQuery = 'Test query'

    // Type in search box
    cy.get('[data-cy="search-input"]').type(searchQuery)

    // Verify input has value
    cy.get('[data-cy="search-input"]').should('have.value', searchQuery)

    // Click clear button
    cy.get('[data-cy="search-clear-button"]').click()

    // Verify input is cleared
    cy.get('[data-cy="search-input"]').should('have.value', '')
  })

  it('should not submit empty search', () => {
    // Try to submit empty search
    cy.get('[data-cy="search-form"]').submit()

    // Should stay on home page
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should preserve search query in URL', () => {
    const searchQuery = 'Web development'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Verify URL contains query
    cy.url().should('include', `/results?q=${encodeURIComponent(searchQuery)}`)

    // Reload page
    cy.reload()

    // Verify search query is still in input
    cy.get('[data-cy="search-input"]').should('have.value', searchQuery)
  })

  it('should handle special characters in search', () => {
    const searchQuery = 'C++ programming & tutorials'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Verify URL properly encodes special characters
    cy.url().should('include', '/results?q=')

    // Verify results page displays the query
    cy.contains(`Search results for "${searchQuery}"`, { timeout: 10000 }).should('be.visible')
  })

  it('should submit search using submit button', () => {
    const searchQuery = 'Button submit test'

    // Type in search box
    cy.get('[data-cy="search-input"]').type(searchQuery)

    // Click submit button
    cy.get('[data-cy="search-submit-button"]').click()

    // Should navigate to results
    cy.url().should('include', '/results?q=')
  })
})
