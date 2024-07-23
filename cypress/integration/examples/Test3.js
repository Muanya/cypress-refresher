describe("Handling Child windows", () => {

    it("Handling open in new tab or new window", () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // handling open in new tab using invoke 
        cy.get("#opentab").invoke('removeAttr', 'target').click();

        cy.origin("https://www.qaclickacademy.com", () => {
            cy.get("#navbarSupportedContent a[href*='about']").click();
            cy.get(".mt-50 h2").should('contain', 'QAClick Academy');

        })

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // handling open in new tab using prop
        cy.get("#opentab").then(($el)=>{
            const url = $el.prop('href')

            cy.visit(url)

            cy.origin(url,  () => {
                cy.get("#navbarSupportedContent a[href*='about']").click();
                cy.get(".mt-50 h2").should('contain', 'QAClick Academy');
    
            })
        })


    })


    it("Handling in new window", ()=>{

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

           // handling open in new window
           cy.window().then((w) => {
            cy.stub(w, 'open').as('windowOpen')
        })

        cy.get("#openwindow").click();

        cy.get('@windowOpen').should('be.called').then((stub) => {
            const newUrl = stub.getCall(0).args[0]
            cy.log(newUrl);

            cy.visit(newUrl)
            cy.origin("https://www.qaclickacademy.com", () => {
                cy.get("#navbarSupportedContent a[href*='about']").click();
                cy.get(".mt-50 h2").should('contain', 'QAClick Academy');

            })

            cy.visit('https://rahulshettyacademy.com/AutomationPractice/')


        })
    })


})