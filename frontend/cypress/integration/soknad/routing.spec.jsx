describe("Tests the routing", () => {

    beforeEach(() => {
       cy.visit("http://localhost:3000/")
   })

    it("Should redirect to /login", () => {
       cy.url().should("eq", "http://localhost:3000/login")
   })

    it('Redirects to home', () => {
        cy
        .get("#loginButton").click()
        .url().should("eq", "http://localhost:3000/home")
    })

    it('Redirects to login when clicking logout', () => {
        cy
        .get("#loginButton").click()
        .get("#logoutButton").click()
        .url().should("eq", "http://localhost:3000/login")
   })

    it('Tests new application', () => {
        cy
        .visit("http://localhost:3000/home")
        .get("#newAppButton").click()
        .url().should("eq", "http://localhost:3000/application")


    })

    it('Tests submit button', () => {
        cy
        .visit("http://localhost:3000/application")
        .get("#submitButton").click()
        .url().should("eq", "http://localhost:3000/home")

    })
}) 