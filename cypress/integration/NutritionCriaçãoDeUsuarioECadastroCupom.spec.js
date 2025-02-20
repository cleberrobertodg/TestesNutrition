
import { randomCPF, email, randomPhone } from '../support/variables';



describe('Criação de usuário Nutrition', function() {

 

    
    
    

    it('Valida se o form aceita campos preenchidos em formato inválido, e se retorna mensagens de erro', function(){

      cy.visit('https://homologh.encinterativa.com.br/nutrition2025/home/')
        cy.title().should('be.equal', 'Promoção Sabor em Família Unilever')

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

        //Testa com nome inválido
        cy.get('#part_cpf').type(randomCPF, {force:true})//preenche cpf corretamente
        cy.get('#part_nome').type('@@@', {force:true}).clear({force:true}).type('12345', {force:true})//preenche nome com caracteres especiais
        //cy.get('#part_sobrenome').type('Test', {force:true})//escreve sobrenome
        cy.get('#part_data_nascimento').type('12041992', {force:true})
        cy.get('#vs1__combobox > div.vs__selected-options > input').click({force:true})//Seleciona Campo Gênero
        cy.get('#vs1__option-0').click({force:true})//Seleciona Gênero Masculino
        cy.get('#part_telefone1').type(randomPhone, {force:true})
        cy.get('#email').type(email, {force:true})//escreve email correto
        cy.get('#email_confirmation').type(email, {force:true})//escreve email de confirmação
        cy.get('#part_cep').type('41245-075', {force:true})//escreve cep
        //cy.contains('button', 'Buscar').click({force:true})//clica em buscar cep
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
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento


        // Testa preenchimento de nascimento inválido
        cy.get('#part_nome').clear({force:true}).type('Cleber Cypress', {force:true})//escreve nome
        cy.get('#part_data_nascimento').clear({force:true}).type('@@@', {force:true}).clear().type('acbkh', {force:true}).clear().type('01011000', {force:true}).clear().type('31313500', {force:true})//escreve datas de nascimento inválidas
        cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento


        //Testa telefone inválido
        cy.get('#part_data_nascimento').clear({force:true}).type('12041992', {force:true})
        cy.get('#part_telefone1').clear({force:true}).type('@@@', {force:true}).clear().type('asdcgg', {force:true})
        cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento

        //Testa email inválido
        cy.get('#part_telefone1').type(randomPhone, {force:true})
        cy.get('#email').clear({force:true}).type('@@@', {force:true}).clear().type('12345', {force:true}).clear().type('cleber.com@email', {force:true})
        cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento


        //Testa email diferente do email cadastrado no campo anterior
        cy.get('#email').clear({force:true}).type(email, {force:true})//escreve email correto
        cy.get('#email_confirmation').clear({force:true}).type('@@@', {force:true}).clear().type('12345', {force:true}).clear().type('cleber@email', {force:true})
        cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        
        
        //Testa cep inválido
        cy.get('#email_confirmation').clear({force:true}).type(email, {force:true})//escreve email de confirmação
        cy.get('#part_cep').clear({force:true}).type('wergaefgaeg', {force:true})//escreve cep inválido com strings
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.get('#part_cep').type('@@@@@@@', {force:true})//escreve cep inválido somente com 9999
        //cy.contains('button', 'Buscar').click({force:true})//clica em buscar cep
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento


        cy.wait(500)
      /*  cy.get('#part_endereco').clear({force:true}).type('@@@@', {force:true})//escreve nome de rua inválido
        cy.get('#part_numero').type('asdfghj', {force:true})//escreve número inválido com strings
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento  */

        //Testa senha inválida
        cy.get('#part_cep').type('41245-075', {force:true})//escreve cep
        cy.get('#password').clear({force:true}).type('asdfghj', {force:true})//digita senha fora do padrão
        Cypress.on('uncaught:exception', (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false
        })
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento


        cy.get('#password').clear({force:true}).type('Senha123', {force:true})//digita senha 
        cy.get('#password_confirmation').type('1223456', {force:true})//digita senha fora do padrão
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
        cy.wait(500)
        cy.get('#part_regulamento').check({force:true})//aceite de termos
        cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
        cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
       // cy.wait(10000)
    })


    

    it('Inscreve corretamente o participante', function(){
      cy.visit('https://homologh.encinterativa.com.br/nutrition2025/home/')
      cy.title().should('be.equal', 'Sabor em Família')

      cy.get('.btn-cookies-unilever').click()//aceita os cookies
      cy.get('#nav-collapse > ul > div > div > ul > li > a').click()//clica em participe
      cy.get('#novo_cpf').type(randomCPF, {force:true})//preenche cpf corretamente
      cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
      cy.wait(500)

      //inicia o preenchimento do form

      cy.get('#part_nome').type('Cypress Auto', {force:true})//escreve nome
      //cy.get('#part_sobrenome').type('Test', {force:true})//escreve sobrenome
      cy.get('#part_data_nascimento').type('12041992', {force:true})
      cy.get('#vs1__combobox > div.vs__selected-options > input').click({force:true})//Seleciona Campo Gênero
      cy.get('#vs1__option-0').click({force:true})//Seleciona Gênero Masculino
      cy.get('#part_telefone1').type(randomPhone, {force:true})
      cy.get('#email').type(email, {force:true})//escreve email correto
      cy.get('#email_confirmation').type(email, {force:true})//escreve email de confirmação
      cy.get('#part_cep').type('41245-075', {force:true})//escreve cep
     // cy.contains('button', 'Buscar').click({force:true})//clica em buscar cep
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
      })
      cy.wait(3000)
      //cy.get('#part_numero').type('100', {force:true})//escreve número da casa
      cy.get('#password').type('Senha123', {force:true})//digita senha 
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
      })
      cy.get('#password_confirmation').type('Senha123', {force:true})//digita confirmação senha
      cy.wait(500)
      cy.get('#part_regulamento').check({force:true})//aceite de termos
     //cy.get('#part_regulamento_promocao').check({force:true})//aceite política de privacidade
      cy.get('#vs2__combobox > div.vs__selected-options > input').click({force:true})//clica no ícone de como ficou sabendo
      cy.get('#vs2__option-5').click({force:true})//clica no ícone de como ficou sabendo, opção Grupo de Promoção
      cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
      cy.wait(1000)
      
  })

  it('Valida preenchimento errado cupom e após isso realiza preenchimento correto', function(){
    
    cy.get('body > div.enc--wrapper > div.page--cupom-sucesso.page-internas > div > div.row.row-btn > div:nth-child(3) > button').click({force:true})//clica em continuar pelo site
    cy.wait(1000)
    cy.get('#novo_cpf').type(randomCPF, {force:true})//preenche cpf corretamente
    cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
    cy.wait(1000)
    cy.get('#text-password').type('Senha123', {force:true})//digita senha 
    cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
    cy.wait(1000)
    cy.get('#cupo_quantidade_marcas').type('7', {force:true})//registra quantidade de marcas
    cy.get('[type="submit"]').contains('Finalizar').click({force:true})//clica em finalizar
    cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
    cy.get('#cupo_valor').type('100,00', {force:true})//registra valor do cupom
    cy.get('#cupo_quantidade_marcas').clear({force:true}).type('@@@@', {force:true})//registra quantidade de marcas de forma inválida
    cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
    cy.get('#cupo_quantidade_marcas').type('abcde', {force:true})//registra quantidade de marcas de forma inválida
    cy.get('.error-form > span').should('be.visible')//valida se aparece msg de erro no preenchimento
    cy.get('#cupo_quantidade_marcas').type('1', {force:true})//registra quantidade de marcas
    cy.get('[type="submit"]').contains('Finalizar').click({force:true})//clica em finalizar
    cy.get('#modalMsg > div > div > div:nth-child(2) > div > p').should('be.visible')//valida se aparece msg de erro no preenchimento
    cy.get('#modalMsg > div > div > div:nth-child(1) > div > div > svg').click({force:true})//clica no x e fecha a mensagem de erro
    
    
    // cy.get('body > div.enc--wrapper > div.page--cupom-sucesso.page-internas > div > div.row.row-btn > div:nth-child(3) > button').click({force:true})//clica em continuar pelo site
    // cy.wait(1000)
    // cy.get('#novo_cpf').type(randomCPF, {force:true})//preenche cpf corretamente
    // cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
    // cy.wait(1000)
    // cy.get('#text-password').type('Senha123', {force:true})//digita senha 
    // cy.get('[type="submit"]').contains('Enviar').click({force:true})//clica em enviar
    // cy.wait(1000)

    cy.get('input[type="file"]#fileInput').selectFile('Nota Fiscal.jpg', {force:true})//insere imagem do cupom
    cy.get('#cupo_quantidade_marcas').type('7', {force:true})//registra quantidade de marcas
    cy.get('#cupo_valor').type('700,00', {force:true})//registra valor do cupom
    cy.get('[type="submit"]').contains('Finalizar').click({force:true})//clica em finalizar
    cy.wait(3000)
    cy.get('body > div.enc--wrapper > div.page--cupom-sucesso.wrapper-cupom-sucesso.page-internas > div > div > div > button:nth-child(4)').contains('Histórico').click({force:true})//clica em finalizar
  })

  })