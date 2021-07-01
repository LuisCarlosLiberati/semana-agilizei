///<reference types = "cypress" />

let Chance = require('chance');
let chance = new Chance();


When(/^informar meus dados$/, () => {
    cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false}));

        //check
        cy.get('input[value=Male]').check();

        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        //select
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', {force: true}); //força a iteração com o elemento

        cy.get('select#yearbox').select('1995');
        cy.get('select[ng-model^=month]').select('June');
        cy.get('select#daybox').select('19');

        //senha
        cy.get('input#firstpassword').type('Agilizei@2021');
        cy.get('input#secondpassword').type('Agilizei@2021');

        //upload de foto
        cy.get('input#imagesrc').attachFile('foto.PNG');

});

When(/^salvar$/, () => {
  //clicar no botao
  cy.get('button#submitbtn').click();
});


Then(/^devo ser cadastrado com sucesso$/, () => {
 //validações das rotas
        cy.wait('@postNewtable').then((resNewtable)=>{
            console.log(resNewtable.status)
            cy.log(resNewtable.status)
            expect(resNewtable.status).to.eq(200)
        })

        cy.wait('@postUsertable').then((resUsertable) => {
            expect(resUsertable.status).to.eq(200)
        })

        cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        })
        
        //verifica a url da pagina que foi aberta
        cy.url().should('contain', 'WebTable')
});