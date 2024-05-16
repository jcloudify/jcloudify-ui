/// <reference types="cypress" />

Cypress.Commands.add("getByTestid", <Subject = any>(id: string) => {
  return cy.get<Subject>(`[data-testid='${id}']`);
});

Cypress.Commands.add("pathnameEq", (to) => {
  cy.window()
    .its("location")
    .should(({pathname}) => {
      expect(pathname).to.eq(to);
    });
});

Cypress.Commands.add("getByHref", <Subject = any>(href: string) => {
  return cy.get<Subject>(`[href='#${href}']`);
});

Cypress.Commands.add("getByName", <Subject = any>(name: string) => {
  return cy.get<Subject>(`[name='${name}']`);
});
