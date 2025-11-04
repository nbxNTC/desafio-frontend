describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    // Clear storage before each test
    cy.clearStorage()

    // Visit home page
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('should load the home page successfully', () => {
    // Check if page title exists
    cy.contains('Featured Videos').should('be.visible')

    // Check if header is present
    cy.get('header').should('be.visible')

    // Check if search bar is present
    cy.get('[data-cy="search-input"]').should('be.visible')
  })

  it('should display video cards on home page', () => {
    // Wait for videos to load
    cy.get('[data-cy="video-card"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Check if video titles are displayed
    cy.get('[data-cy="video-title"]').should('have.length.greaterThan', 0)
  })

  it('should display multiple category sections', () => {
    // Check for category sections
    cy.contains('Featured Videos', { timeout: 10000 }).should('be.visible')

    // Scroll down to see more categories
    cy.scrollTo('bottom', { duration: 1000 })

    // Verify multiple sections exist
    cy.get('h2').should('have.length.greaterThan', 1)
  })

  it('should have responsive layout on mobile', () => {
    // Set mobile viewport
    cy.viewport('iphone-x')

    // Check if page is still accessible
    cy.contains('Featured Videos', { timeout: 10000 }).should('be.visible')

    // Check if videos are displayed
    cy.get('[data-cy="video-card"]').first().should('be.visible')
  })

  it('should have responsive layout on tablet', () => {
    // Set tablet viewport
    cy.viewport('ipad-2')

    // Check if page is still accessible
    cy.contains('Featured Videos', { timeout: 10000 }).should('be.visible')

    // Check if videos are displayed
    cy.get('[data-cy="video-card"]').should('have.length.greaterThan', 0)
  })

  it('should navigate using the header logo', () => {
    // Click on logo (if it exists and is clickable)
    cy.get('header').within(() => {
      cy.get('a').first().click()
    })

    // Should stay on home page
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should handle errors gracefully when API fails', () => {
    // Intercept YouTube API calls and force them to fail
    cy.intercept('GET', '**/youtube/v3/**', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('apiError')

    // Visit home page
    cy.visit('/')

    // Should display error message or fallback UI
    cy.contains(/no videos available|error/i, { timeout: 10000 }).should('be.visible')
  })

  it('should display video thumbnails correctly', () => {
    // Wait for video cards to load
    cy.get('[data-cy="video-card"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Check if thumbnails are displayed
    cy.get('[data-cy="video-thumbnail"]').first().should('be.visible')

    // Check if thumbnail has correct aspect ratio
    cy.get('[data-cy="video-thumbnail"]').first().should('have.class', 'aspect-video')
  })

  it('should display channel information', () => {
    // Wait for video cards to load
    cy.get('[data-cy="video-card"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Check if at least one video has channel info
    cy.get('[data-cy="video-channel"]').should('have.length.greaterThan', 0)
  })
})
