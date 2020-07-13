describe('map', () => {
  const timeUntilShowUp = 1000;
  const backednURL = 'http://localhost:7000/api/day/*';

  it(`should display 16 provinces`, () => {
    cy.visit('/');
    cy.get('.map').find('path').should('have.length', 16);
  });

  it('should display provinces in black on request error', () => {
    cy.visit('/');

    cy.get('.map').find('path').first().should('have.attr', 'fill', 'black');
  });

  it(`should display tooltip when user hover over province for ${timeUntilShowUp}ms`, () => {
    cy.fixture('request').as('backend');
    cy.server();
    cy.route(backednURL, '@backend').as('loaded');
    cy.visit('/');
    cy.wait('@loaded');

    cy.get('.svg-root').first().trigger('mouseover', { force: true });
    cy.get('.map').find('path').first().trigger('mousemove', { force: true });
    cy.wait(timeUntilShowUp);
    cy.get('.tooltip').should('exist');

    cy.get('.map').find('path').first().trigger('mousemove', { force: true });
    cy.get('.svg-root').trigger('mouseout', { force: true });
    cy.get('.tooltip').should('not.exist');
  });
});
