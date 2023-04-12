import login from "../support/page/login";
import loginPage from "../support/page/login";
import shaversPage from "../support/page/shavers";

describe('login', () => {

    context('quando submeto o formulário', () => {


        it('deve logar com sucesso', () => {

            const user = {
                name: 'gabriel',
                email: 'gabrielteste@gmail.com',
                password: 'teste1234'
            }

            loginPage.submit(user.email, user.password)

            shaversPage.header.userShouldBeLoggedIn(user.name)
        });

        it('não deve logar com senha incorreta', () => {

            const user = {
                name: 'gabriel',
                email: 'gabrielteste@gmail.com',
                password: 'senhaErrada'
            }

            loginPage.submit(user.email, user.password)

            const errorMessage = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(errorMessage)

        });

        it('não deve logar com email incorreto', () => {

            const user = {
                name: 'gabriel',
                email: 'gabriel404@gmail.com',
                password: 'senhaErrada'
            }

            cy.visit('http://localhost:3000')

            loginPage.submit(user.email, user.password)

            const errorMessage = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(errorMessage)

        });

        it('campos obrigatorios', () => {
            loginPage.submit()
            loginPage.requireFields('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('senha muito curta', () => {

        const passwords = [
            '5',
            '54',
            '543',
            '5432',
            '54321'
        ]

        passwords.forEach(p => {
            it('não deve logar com a senha: ' + p, () => {
                loginPage.submit('gabrielteste@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        });
    })

    context('email no formato incorreto', () => {

        const emails = [
            'gabrielteste@',
            'teste@',
            '@@@@@',
            'asdasddas',
            'n é um email'
        ]

        emails.forEach(e => {
            it('não deve logar com o email: ' + e, () => {
                loginPage.submit(e, 'teste1234')
                loginPage.alertShouldBe('Informe um email válido')
            })
        });
    })

})

