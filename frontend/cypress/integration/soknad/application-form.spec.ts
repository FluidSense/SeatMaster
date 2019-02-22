describe('Tests the application form for user', () => {

  beforeEach(() => {
    cy
            .visit('localhost:3000/application');
  });

  it('Greets with my application', () => {
    cy
            .contains('h1', 'My application');
  });

  it('Finds name', () => {
    cy
            .get('#fullname')
            .should('be.disabled');

  });

  it('Finds Email', () => {
    cy
            .get('#email')
            .should('be.disabled');
  });

  it('Finds Phone', () => {
    cy
            .get('#phone')
            .should('be.disabled');

  });

  it('Finds Status', () => {
    cy
            .get('#status')
            .should('be.disabled')
            .should('have.length', 1);
  });

  it('Checks partner name if box is checked and inputfield opens', () => {
    cy
            .get('#partnerUsername').should('be.disabled')

            .get('.skjemaelement.skjemaelement--horisontal')
            .contains('I wish to sit with my partner').click()
            .get('.skjemaelement__input.checkboks').should('be.checked')

            .get('#partnerUsername').should('not.be.disabled');
  });

  it('Finds keep seat', () => {
    cy
            .get('.skjemaelement.skjemaelement--horisontal')
            .contains('I would like to keep my seat from the previous semester').click()
            .get('.skjemaelement__input.checkboks').should('be.checked');

  });

  it('Finds needs box and text if checked', () => {
    cy
            .get('#needsText').should('be.disabled')

            .get('.skjemaelement.skjemaelement--horisontal')
            .contains('I have needs for my seat').click()
            .get('.skjemaelement__input.checkboks').should('be.checked')

            .get('#needsText').should('not.be.disabled');
  });

  it('links correctly', () => {
    cy
            .get('');
  });
});
