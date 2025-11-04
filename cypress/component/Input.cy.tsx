import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('should render an input field', () => {
    cy.mount(<Input placeholder='Enter text' data-cy='test-input' />)
    cy.get('[data-cy="test-input"]').should('be.visible')
    cy.get('[data-cy="test-input"]').should('have.attr', 'placeholder', 'Enter text')
  })

  it('should accept and display user input', () => {
    cy.mount(<Input data-cy='test-input-value' />)

    const testValue = 'Test input value'
    cy.get('[data-cy="test-input-value"]').type(testValue)
    cy.get('[data-cy="test-input-value"]').should('have.value', testValue)
  })

  it('should handle onChange events', () => {
    const onChangeSpy = cy.stub().as('onChangeSpy')
    cy.mount(<Input onChange={onChangeSpy} data-cy='test-input-change' />)

    cy.get('[data-cy="test-input-change"]').type('a')
    cy.get('@onChangeSpy').should('have.been.called')
  })

  it('should be disabled when disabled prop is true', () => {
    cy.mount(<Input disabled data-cy='test-input-disabled' />)
    cy.get('[data-cy="test-input-disabled"]').should('be.disabled')
  })

  it('should accept different input types', () => {
    const types = ['text', 'email', 'password', 'number'] as const

    types.forEach((type) => {
      cy.mount(<Input type={type} data-cy={`test-input-type-${type}`} />)
      cy.get(`[data-cy="test-input-type-${type}"]`).should('have.attr', 'type', type)
    })
  })

  it('should apply custom className', () => {
    cy.mount(<Input className='custom-input-class' data-cy='test-input-custom' />)
    cy.get('[data-cy="test-input-custom"]').should('have.class', 'custom-input-class')
  })

  it('should support controlled component pattern', () => {
    cy.mount(<Input value='controlled value' onChange={() => {}} data-cy='test-input-controlled' />)
    cy.get('[data-cy="test-input-controlled"]').should('have.value', 'controlled value')
  })

  it('should have proper data-slot attribute', () => {
    cy.mount(<Input data-cy='test-input-slot' />)
    cy.get('[data-cy="test-input-slot"]').should('have.attr', 'data-slot', 'input')
  })

  it('should clear input value', () => {
    cy.mount(<Input data-cy='test-input-clear' />)
    cy.get('[data-cy="test-input-clear"]').type('test value')
    cy.get('[data-cy="test-input-clear"]').clear()
    cy.get('[data-cy="test-input-clear"]').should('have.value', '')
  })
})
