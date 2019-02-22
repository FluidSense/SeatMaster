describe('Tests making a new application', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/admin/create-season');
  });

  it('Checks that its on the correct site', () => {
    cy
      .get('#new-application-season')
      .contains('New Application Season');
  });

  it('Chooses start application season date', () => {
    cy
      .get('#appSeason')
      .get('.knapp.knapp--hoved').eq(1)
      .click()
      .get('.ReactModal__Content.ReactModal__Content--after-open.modal')
      .get('.DayPicker-Day').contains('1').click()
      .get('#root')
      .should('not.contain', '.ReactModal__Content.ReactModal__Content--after-open.modal');
  });

  it('Chooses end application season date', () => {
    cy
      .get('.knapp.knapp--hoved').eq(2);
  });

  it('Chooses start room season date', () => {
    cy
      .get('.knapp.knapp--hoved').eq(3);
  });

  it('Chooses end room season date', () => {
    cy
      .get('.knapp.knapp--hoved').eq(4);
  });

  it('Checks that submit works', () => {
    cy
      .get('.knapp.knapp--hoved').eq(5);
  });

});
