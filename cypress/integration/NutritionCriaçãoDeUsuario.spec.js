
import { randomCPF, email, randomPhone } from '../support/variables';



describe('Criação de usuário PagMenos', function() {

 

    beforeEach(() => {
        cy.visit('https://homologh.encinterativa.com.br/nutrition2025/home/')
        cy.title().should('be.equal', 'Sabor em Família')
      })
    
    

    it('Valida se o form aceita campos preenchidos em formato inválido, e se retorna mensagens de erro', function(){

     cy.log('Valida se o form aceita campos preenchidos em formato inválido, e se retorna mensagens de erro')

        cy.get('.btn-cookies-unilever').click()//aceita os cookies
        cy.get('#nav-collapse > ul > div > div > ul > li > a').click()//clica em participe
        cy.get('#novo_cpf').type('srgtewrgt', {force:true})//preenche cpf errado
        cy.get('#input-cpf-new-feedback > span').should('be.visible').contains('O campo CPF é obrigatório')//verifica msg de erro
        cy.get('#novo_cpf').type(randomCPF)//insere cpf válido
        cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
        cy.wait(500)

        //inicia preenchimento de form

        cy.get('#part_cpf').clear({force:true})//apaga campo de cpf
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#part_cpf').type('abcdefg', {force:true})//escreve string no cpf
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#part_nome').type('@@@', {force:true}).clear().type('12345', {force:true})//preenche nome com caracteres especiais
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#part_data_nascimento').type('@@@', {force:true}).clear().type('acbkh', {force:true}).clear().type('01011000', {force:true}).clear().type('31313500', {force:true})//escreve datas de nascimento inválidas
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#part_telefone1').type('@@@', {force:true}).clear().type('asdcgg', {force:true})
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#email').type('@@@', {force:true}).clear().type('12345', {force:true}).clear().type('cleber.com@email', {force:true})
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#email_confirmation').type('@@@', {force:true}).clear().type('12345', {force:true}).clear().type('cleber@email', {force:true})
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#part_cep').type('wergaefgaeg', {force:true})//escreve cep inválido com strings
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#part_cep').type('99999999', {force:true})//escreve cep inválido somente com 9999
        cy.contains('button', 'Buscar').click({force:true})//clica em buscar cep
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.wait(500)
      /*  cy.get('#part_endereco').clear({force:true}).type('@@@@', {force:true})//escreve nome de rua inválido
        cy.get('#part_numero').type('asdfghj', {force:true})//escreve número inválido com strings
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento  */
        cy.get('#password').type('asdfghj', {force:true})//digita senha fora do padrão
        Cypress.on('uncaught:exception', (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false
        })
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#password_confirmation').type('1223456', {force:true})//digita senha fora do padrão
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.wait(500)
        cy.get('#part_regulamento').check({force:true})//aceite de termos
        cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
       // cy.wait(10000)
    })


    

    it('Inscreve corretamente o participante', function(){


      cy.get('.btn-cookies-unilever').click()//aceita os cookies
      cy.get('#nav-collapse > ul > div > div > ul > li > a').click()//clica em participe
      cy.get('#novo_cpf').type(randomCPF, {force:true})//preenche cpf corretamente
      cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
      cy.wait(500)

      //inicia o preenchimento do form

      cy.get('#part_nome').type('Cleber Cypress', {force:true})//escreve nome
      //cy.get('#part_sobrenome').type('Test', {force:true})//escreve sobrenome
      cy.get('#part_data_nascimento').type('12041992', {force:true})
      cy.get('#vs1__combobox > div.vs__selected-options > input').click({force:true})//Seleciona Campo Gênero
      cy.get('#vs1__option-0').click({force:true})//Seleciona Gênero Masculino
      cy.get('#part_telefone1').type(randomPhone, {force:true})
      cy.get('#email').type(email, {force:true})//escreve email correto
      cy.get('#email_confirmation').type(email, {force:true})//escreve email de confirmação
      cy.get('#part_cep').type('41245-075', {force:true})//escreve cep
      cy.contains('button', 'Buscar').click({force:true})//clica em buscar cep
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      cy.wait(3000)
      //cy.get('#part_numero').type('100', {force:true})//escreve número da casa
      cy.get('#password').type('Senha123', {force:true})//digita senha 
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      cy.get('#password_confirmation').type('Senha123', {force:true})//digita confirmação senha
      cy.wait(500)
      cy.get('#part_regulamento').check({force:true})//aceite de termos
     //cy.get('#part_regulamento_promocao').check({force:true})//aceite política de privacidade
      cy.get('#vs2__combobox > div.vs__selected-options > input').click({force:true})//clica no ícone de como ficou sabendo
      cy.get('#vs2__option-5').click({force:true})//clica no ícone de como ficou sabendo, opção Grupo de Promoção
      cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
      //cy.wait(10000)
  })

  })

  

  export const cpfCadastrado = randomCPF



  
