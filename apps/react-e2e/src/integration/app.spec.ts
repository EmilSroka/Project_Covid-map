describe('react', () => {
  const pandemicStart = '2020-03-04';
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    cy.contains('Coronavirus cases in Poland on');
  });

  it('should display map', () => {
    cy.get('.map__wrapper').should('exist');
    cy.get('.map__wrapper').find('path');
  });

  it('should display date picker', () => {
    cy.get('.date-picker__wrapper').should('exist');
    cy.get('.date-picker__input').should('have.value', pandemicStart);
    cy.get('.date-picker__input').type('2020-05-01');
    cy.get('.date-picker__input').should('have.value', '2020-05-01');
  });
});
