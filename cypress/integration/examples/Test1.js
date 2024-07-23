
describe("My First Test Suite",  () => {
    it("First One",  () => {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('.search-keyword').type("ca")

        cy.get('.product').should('have.length', 5)
        cy.get('.products').find('.product').as('productLocator')
        cy.get('@productLocator').should('have.length', 4)
        cy.get('@productLocator').eq(2).contains('ADD TO CART').click()
        cy.get('@productLocator').each(($el, index, $list)=>{
            let text = $el.find('h4.product-name').text()

            if (text.includes('Cashew')) {
                $el.find('button').click()
                
            }
        });

        cy.get('a.cart-icon').click()
        cy.contains("PROCEED TO CHECKOUT").click()
        cy.contains("Place Order").click()
        
    })


    it('My FirstTest case',function() {
 
        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
         
        //cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click({force: true})
        cy.url().should('include','top')
        })
        
})