export default class ShopPage {
    go() {
        cy.visit(Cypress.env('url') + "/angularpractice")
        cy.get(':nth-child(2) > .nav-link').click()

    }

    get checkoutButton() {
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')

    }

    get purchaseButton() {
        return cy.get('.btn.btn-success')
    }
}


