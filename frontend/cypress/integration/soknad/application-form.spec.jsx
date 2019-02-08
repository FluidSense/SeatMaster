describe("Tests the application form for user", () => {

    /*
    When removing the test info, 
    we need to seed the db with data in this test for it to pass

    */

    beforeEach(() => {
        cy.visit("localhost:3000/application")
    })

    it("Greets with my application", () => {
        cy.contains("h1", "My application")
    })

    it('Finds name', () => {
        cy
        .contains("#fullname")
        .should("not.be.empty")
        
    })

    it('Finds Email', () => {
        cy
        .get("#email")
        .should("be.disabled")
    })

    it('Finds Phone', () => {
        cy
        .get("#phone")
        .should("be.disabled")
        
    })

    it('Finds Status', () => {
        cy
        .get("#status")
        .should("be.disabled")
        .should("have.length", 1)
    })

    it('Checks partner name if box is checked and inputfield opens', () => {
        cy
        .get("#partnerUsername").should("be.disabled")

        .get(".skjemaelement.skjemaelement--horisontal").contains("I wish to sit with my partner").click()
        .get(".skjemaelement__input.checkboks").should("be.checked")

        .get("#partnerUsername").should("not.be.disabled")
    })

    it('Finds keep seat', () => {
        
    })

    it('Finds needs box and text if checked', () => {
        
    })

    it('links correctly', () => {
        cy
        .contains()
    })
})