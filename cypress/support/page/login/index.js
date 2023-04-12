class LoginPage {

    constructor() {
        this.alertError = '.alert-error'
    }

    submit(email = null, password = null) {

        cy.visit('/')

        cy.get('input[placeholder$=email]').as('email')
        cy.get('input[placeholder$=email]').as('password')

        if (email) {
            cy.get('input[placeholder$=email]').type(email)
        }
        if (password) {
            cy.get('input[placeholder*=senha]').type(password)

        }

        // //button[text()="Entrar"]
        cy.contains('button', 'Entrar')
            .click()
    }

    noticeShouldBe(errorMessage) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', errorMessage)
    }

    alertShouldBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)
    }

    requireFields(emailMessage, passMessage) {
        cy.get(this.alertError)
            .should('have.length', 2)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(emailMessage)
                expect($small.get(1).textContent).to.equal(passMessage)
            })

    }
}

export default new LoginPage()