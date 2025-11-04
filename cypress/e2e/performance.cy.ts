describe('Performance E2E Tests', () => {
  beforeEach(() => {
    cy.clearStorage()
  })

  it('should load home page within acceptable time', () => {
    const startTime = performance.now()

    cy.visit('/')
    cy.waitForPageLoad()

    cy.window().then(() => {
      const endTime = performance.now()
      const loadTime = endTime - startTime

      // Home page should load in less than 5 seconds
      expect(loadTime).to.be.lessThan(5000)
    })
  })

  it('should load search results within acceptable time', () => {
    cy.visit('/')

    const startTime = performance.now()

    cy.get('input[placeholder="Search"]').type('React')
    cy.get('form').first().submit()

    cy.contains('Search results for', { timeout: 10000 }).should('be.visible')

    cy.window().then(() => {
      const endTime = performance.now()
      const searchTime = endTime - startTime

      // Search should complete in less than 3 seconds
      expect(searchTime).to.be.lessThan(3000)
    })
  })

  it('should render images efficiently', () => {
    cy.visit('/')

    // Wait for images to start loading
    cy.get('img', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Check that images have loading attribute (for lazy loading)
    cy.get('img').first().should('exist')
  })

  it('should not have excessive DOM size', () => {
    cy.visit('/')
    cy.waitForPageLoad()

    cy.document().then((doc) => {
      const domSize = doc.querySelectorAll('*').length

      // DOM should have less than 1500 elements for good performance
      expect(domSize).to.be.lessThan(1500)
    })
  })
})
