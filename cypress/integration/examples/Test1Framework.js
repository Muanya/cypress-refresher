import ShopPage from "./pageObjects/shopPage";

describe("Using Cypress Framework", () => {

    beforeEach(() => {
        cy.fixture("example").then(function (data) {
            this.data = data
        })
    })

    it("Test Suite", function () {
        cy.visit(Cypress.env("url") + "/angularpractice")

        cy.get(':nth-child(1) > .form-control').type(this.data.name)
        cy.get(':nth-child(2) > .form-control').type(this.data.email)

        cy.get(':nth-child(1) > .form-control').should('have.attr', 'minlength', '2')
        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name)
        cy.get('#inlineRadio3').should('be.disabled')
    })


    it("Test Shop", { defaultCommandTimeout: 8000 }, function () {
        const shop = new ShopPage()

        shop.go()

        this.data.productName.forEach(function (element) {
            cy.selectProduct(element)

        });

        shop.checkoutButton.click()

        cy.get('tbody > :nth-child(1) > :nth-child(4)').then((t) => {
            cy.log(t.text())
        })

        let total = 0

        cy.get('tbody>tr').each(($el, index, $list) => {


            if (index == $list.length - 1) {
                return false;
            }

            cy.wrap($el).within(() => {
                if (index == $list.length - 2) {
                    cy.get('td').eq(4).then((el) => {
                        const txt = el.text().split(" ")
                        expect(Number(txt[1])).to.be.equal(total)
                    })
                    return false
                }
                cy.get('td').eq(3).then((el) => {
                    const txt = el.text().split(" ")
                    total += Number(txt[1])
                    cy.log(total)
                })


            })

        })


        cy.contains('Checkout').click()
        cy.get("#country").type("america")
        cy.get('.suggestions > ul > li > a').click()
        // cy.get('.suggestions > ul > li > a').click()

        cy.get("#checkbox2").check({ force: true })
        shop.purchaseButton.click()
        cy.get('.alert').then((el) => {
            expect(el.text().includes("Failed!")).to.be.true
        })




    })
})