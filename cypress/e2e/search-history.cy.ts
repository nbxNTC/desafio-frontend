describe('Search History E2E Tests', () => {
  beforeEach(() => {
    // Clear storage before each test
    cy.clearStorage()

    // Visit home page
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('should save search to history', () => {
    const searchQuery = 'Node.js tutorial'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Wait for navigation
    cy.url().should('include', '/results?q=')

    // Go back to home
    cy.visit('/')

    // Click on search input to open history popover
    cy.get('[data-cy="search-input"]').click()

    // Verify search history contains the query
    cy.get('[data-cy="search-history-item"]').should('contain', searchQuery)
  })

  it('should navigate to results when clicking history item', () => {
    const searchQuery = 'TypeScript basics'

    // Perform initial search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Wait for results
    cy.url().should('include', '/results?q=')

    // Go back to home
    cy.visit('/')

    // Click on search input to open history
    cy.get('[data-cy="search-input"]').click()

    // Click on history item
    cy.get('[data-cy="search-history-item"]').first().click()

    // Should navigate to results page
    cy.url().should('include', '/results?q=')
    cy.contains(`Search results for "${searchQuery}"`, { timeout: 10000 }).should('be.visible')
  })

  it('should store multiple searches in history', () => {
    const searches = ['React tutorial', 'Vue.js basics', 'Angular guide']

    // Perform multiple searches
    searches.forEach((query) => {
      cy.visit('/')
      cy.get('[data-cy="search-input"]').type(query)
      cy.get('[data-cy="search-form"]').submit()
      cy.url().should('include', '/results?q=')
    })

    // Go back to home
    cy.visit('/')

    // Open search history
    cy.get('[data-cy="search-input"]').click()

    // Verify all searches are in history
    searches.forEach((query) => {
      cy.get('[data-cy="search-history-item"]').should('contain', query)
    })
  })

  it('should persist search history across page reloads', () => {
    const searchQuery = 'Persistent search'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Reload page
    cy.reload()

    // Go to home
    cy.visit('/')

    // Open search history
    cy.get('[data-cy="search-input"]').click()

    // Verify search is still in history
    cy.get('[data-cy="search-history-item"]', { timeout: 5000 }).should('contain', searchQuery)
  })

  it('should remove individual search history items', () => {
    const searchQuery = 'Search to remove'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Go back to home
    cy.visit('/')

    // Open search history
    cy.get('[data-cy="search-input"]').click()

    // Verify item exists
    cy.get('[data-cy="search-history-item"]').should('contain', searchQuery)

    // Click remove button
    cy.get('[data-cy="search-history-remove-button"]').first().click({ force: true })

    // Verify item is removed (history should be empty or not contain the item)
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="search-history-item"]').length > 0) {
        cy.get('[data-cy="search-history-item"]').should('not.contain', searchQuery)
      }
    })
  })

  it('should not duplicate search queries', () => {
    const searchQuery = 'Duplicate test'

    // Perform same search multiple times
    for (let i = 0; i < 3; i++) {
      cy.visit('/')
      cy.get('[data-cy="search-input"]').type(searchQuery)
      cy.get('[data-cy="search-form"]').submit()
      cy.url().should('include', '/results?q=')
    }

    // Go back to home
    cy.visit('/')

    // Open search history
    cy.get('[data-cy="search-input"]').click()

    // Count occurrences - should only have one item with this query
    cy.get('[data-cy="search-history-item"]')
      .filter(`:contains("${searchQuery}")`)
      .should('have.length', 1)
  })

  it('should close search history when clicking outside', () => {
    const searchQuery = 'Test query'

    // Perform search
    cy.get('[data-cy="search-input"]').type(searchQuery)
    cy.get('[data-cy="search-form"]').submit()

    // Go back to home
    cy.visit('/')

    // Open search history
    cy.get('[data-cy="search-input"]').click()

    // Verify history is visible
    cy.get('[data-cy="search-history-popover"]', { timeout: 5000 }).should('be.visible')

    // Click outside (on the body)
    cy.get('body').click(0, 0)

    // History should close
    cy.wait(500)
    cy.get('[data-cy="search-history-popover"]').should('not.exist')
  })
})
