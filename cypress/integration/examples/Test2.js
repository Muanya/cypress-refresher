describe("Automation test", () => {
    it("Second", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1').and('not.have.value', 'option2')
        cy.get('input[type="checkbox"]').uncheck()
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])

        cy.get('#dropdown-class-example').select('option2')


        //Dynamic dropdowns
        cy.get('#autocomplete').type('nig')

        cy.get('li.ui-menu-item').each(($el, index, $list) => {
            const txt = $el.text()

            if (txt === "Nigeria") {
                $el.click()
            }
        })

        cy.get('#autocomplete').should('have.value', "Nigeria")


        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
        
        cy.get('[value="radio3"]').check().should('be.checked')

    })
})