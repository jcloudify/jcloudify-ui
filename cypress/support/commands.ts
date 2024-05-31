/// <reference types="cypress" />

import {jcloudify} from "./util";

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
  return cy.get<Subject>(`[href='${href}']`);
});

Cypress.Commands.add("getByName", <Subject = any>(name: string) => {
  return cy.get<Subject>(`[name='${name}']`);
});

Cypress.Commands.add("mockToken", (token) => {
  return cy.intercept("GET", jcloudify("/token?code=*"), token);
});

Cypress.Commands.add("fakeLogin", (user) => {
  // Clicking the login button initiates the GitHub OAuth login challenge.
  // To avoid this, directly set the auth_process to handle the login and proceed to the code exchange and whoami steps.
  localStorage.setItem("auth_process", "login");
  cy.mockToken({
    access_token: user.token,
    token_type: "bearer",
  });

  cy.intercept("GET", jcloudify("/whoami"), {
    user,
  });

  cy.visit("/auth/callback?code=fakecode");
});
