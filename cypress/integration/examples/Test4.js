
describe("My First Test Suite", () => {

    it('Calendar select test case', function () {

        const monthToSelect = "08"
        const yearToSelect = "2030"
        const dayToSelect = "31"

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

        cy.get('[href="#/offers"]').invoke('removeAttr', 'target').click()

        cy.get('.react-date-picker__calendar-button').click()

        cy.get('.react-calendar__navigation__label').click().click()


        cy.get('.react-calendar__tile').filter(`:contains('${yearToSelect}')`).then(($el) => {
            if ($el.length == 1) {
                cy.wrap($el).click()
            }
        })

        cy.get('.react-calendar__tile').eq(Number(monthToSelect - 1)).click()

        cy.get('.react-calendar__tile').filter(`:contains("${dayToSelect}")`).then((el) => {
            if (el.length > 1) {
                cy.wrap(el).eq(1).click()
            } else {
                cy.wrap(el).eq(0).click()
            }
        })

        cy.get('.react-calendar__tile').its('length').then((l) => {
            cy.log(l)
        })


        cy.get('.react-date-picker__inputgroup').find('input').eq(0).then(($el) => {
            let selectedDate = $el.val().trim()
            expect(selectedDate).to.equal(`${yearToSelect}-${monthToSelect}-${dayToSelect}`)
        })

    })




})