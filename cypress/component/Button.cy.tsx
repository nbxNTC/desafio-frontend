import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('should render with default variant', () => {
    cy.mount(<Button data-cy='test-button'>Click me</Button>)
    cy.get('[data-cy="test-button"]').should('be.visible').and('contain', 'Click me')
  })

  it('should render with different variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const

    variants.forEach((variant) => {
      cy.mount(
        <Button variant={variant} data-cy={`test-button-${variant}`}>
          Button {variant}
        </Button>
      )
      cy.get(`[data-cy="test-button-${variant}"]`)
        .should('be.visible')
        .and('contain', `Button ${variant}`)
    })
  })

  it('should render with different sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const

    sizes.forEach((size) => {
      cy.mount(
        <Button size={size} data-cy={`test-button-${size}`}>
          Button {size}
        </Button>
      )
      cy.get(`[data-cy="test-button-${size}"]`).should('be.visible')
    })
  })

  it('should handle click events', () => {
    const onClickSpy = cy.stub().as('onClickSpy')
    cy.mount(
      <Button onClick={onClickSpy} data-cy='test-button-click'>
        Click me
      </Button>
    )

    cy.get('[data-cy="test-button-click"]').click()
    cy.get('@onClickSpy').should('have.been.calledOnce')
  })

  it('should be disabled when disabled prop is true', () => {
    cy.mount(
      <Button disabled data-cy='test-button-disabled'>
        Disabled Button
      </Button>
    )
    cy.get('[data-cy="test-button-disabled"]').should('be.disabled')
  })

  it('should render as a child component (asChild)', () => {
    cy.mount(
      <Button asChild data-cy='test-button-as-child'>
        <a href='https://example.com'>Link Button</a>
      </Button>
    )

    cy.get('a[data-cy="test-button-as-child"]').should('have.attr', 'href', 'https://example.com')
  })

  it('should apply custom className', () => {
    cy.mount(
      <Button className='custom-class' data-cy='test-button-custom'>
        Custom Button
      </Button>
    )
    cy.get('[data-cy="test-button-custom"]').should('have.class', 'custom-class')
  })

  it('should have proper data-slot attribute', () => {
    cy.mount(<Button data-cy='test-button-slot'>Test Button</Button>)
    cy.get('[data-cy="test-button-slot"]').should('have.attr', 'data-slot', 'button')
  })
})
