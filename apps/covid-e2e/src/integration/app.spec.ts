import { verify } from 'cypress/types/sinon';

describe('covid', () => {
  const pandemicStart = '2020-03-04';
  const backednURL = 'http://localhost:7000/api/day/*';

  beforeEach(() => {
    cy.server()
      .route({
        force404: true,
        url: backednURL,
      })
      .as('getData');
    cy.visit('/');
  });

  it('should display title', () => {
    cy.contains('Coronavirus cases in Poland on');
  });

  it('should display map', () => {
    cy.get('.map').should('exist');
    cy.get('.map').find('path');
  });

  it('should display error message on request failure', () => {
    cy.wait('@getData'); //.its('status').should('be', 404);
    cy.contains('No response from backend');
  });

  it('should display date picker', () => {
    cy.get('.date-picker').should('exist');
    cy.get('.date-picker').should('have.value', pandemicStart);
    cy.get('.date-picker').type('2020-05-01');
    cy.get('.date-picker').should('have.value', '2020-05-01');
  });
});
