import { VideoCard } from '@/components/ui/video-card'

describe('VideoCard Component', () => {
  const mockVideoData = {
    videoId: 'dQw4w9WgXcQ',
    title: 'Test Video Title',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    channelTitle: 'Test Channel',
    publishedAt: '2024-01-01T12:00:00Z'
  }

  it('should render the video card with all information', () => {
    cy.mount(<VideoCard {...mockVideoData} />)

    // Check if video card is rendered
    cy.get('[data-cy="video-card"]').should('be.visible')

    // Check if title is rendered
    cy.get('[data-cy="video-title"]').should('be.visible').and('contain', mockVideoData.title)

    // Check if channel title is rendered
    cy.get('[data-cy="video-channel"]')
      .should('be.visible')
      .and('contain', mockVideoData.channelTitle)

    // Check if thumbnail is rendered
    cy.get('[data-cy="video-thumbnail"]').should('be.visible')

    // Check if date is rendered
    cy.get('[data-cy="video-date"]').should('be.visible')
  })

  it('should render without optional props', () => {
    cy.mount(
      <VideoCard
        videoId={mockVideoData.videoId}
        title={mockVideoData.title}
        thumbnail={mockVideoData.thumbnail}
      />
    )

    cy.get('[data-cy="video-card"]').should('be.visible')
    cy.get('[data-cy="video-title"]').should('be.visible')
    cy.get('[data-cy="video-channel"]').should('not.exist')
    cy.get('[data-cy="video-date"]').should('not.exist')
  })

  it('should apply hover scale animation', () => {
    cy.mount(<VideoCard {...mockVideoData} />)

    cy.get('[data-cy="video-card"]').should('have.class', 'group')
    cy.get('[data-cy="video-card"]').should('have.class', 'hover:scale-105')
  })

  it('should render with custom className', () => {
    const customClass = 'custom-test-class'
    cy.mount(<VideoCard {...mockVideoData} className={customClass} />)

    cy.get('[data-cy="video-card"]').should('have.class', customClass)
  })

  it('should have correct aspect ratio for thumbnail', () => {
    cy.mount(<VideoCard {...mockVideoData} />)

    cy.get('[data-cy="video-thumbnail"]').should('have.class', 'aspect-video')
  })

  it('should display image with correct alt text', () => {
    cy.mount(<VideoCard {...mockVideoData} />)

    cy.get('[data-cy="video-thumbnail"]')
      .find('img')
      .should('have.attr', 'alt', mockVideoData.title)
  })

  it('should render all video information in correct structure', () => {
    cy.mount(<VideoCard {...mockVideoData} />)

    // Verify structure
    cy.get('[data-cy="video-card"]').within(() => {
      cy.get('[data-cy="video-thumbnail"]').should('exist')
      cy.get('[data-cy="video-title"]').should('exist')
      cy.get('[data-cy="video-channel"]').should('exist')
      cy.get('[data-cy="video-date"]').should('exist')
    })
  })
})
