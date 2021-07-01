//steps comuns a mais de uma feature

Given(/^que acesso o site$/, () => {
	//rotas
    cy.server()
    cy.route('POST','**//api/1/databases/userdetails/collections/newtable?**' ).as('postNewtable');
    cy.route('POST','**//api/1/databases/userdetails/collections/usertable?**' ).as('postUsertable');
    cy.route('GET','**//api/1/databases/userdetails/collections/newtable?**' ).as('getNewtable');

    // base url + register.html
    cy.visit('Register.html');
});