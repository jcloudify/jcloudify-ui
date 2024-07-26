/// <reference types="cypress" />

import {
  preprod_env,
  preprod_env2,
  prod_env,
} from "../fixtures/environment.mock";
import {app1, app2, apps} from "../fixtures/application.mock";
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

Cypress.Commands.add("muiSelect", (selector, value) => {
  cy.get(selector).click();
  cy.get(`[data-value="${value}"]`).click();
});

Cypress.Commands.add("muiClear", (selector) => {
  cy.get(selector).click();
  cy.get('[aria-label="Clear value"]').click();
});

Cypress.Commands.add("mockToken", (token) => {
  return cy.intercept("GET", jcloudify("/token?code=*"), token);
});

Cypress.Commands.add("mockApiGet", () => {
  cy.intercept("GET", jcloudify(`/users/*/applications`), {
    data: apps,
  }).as("getApplications");

  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments`),
    {
      data: [prod_env, preprod_env],
    }
  ).as("getEnvironments");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app2.id}/environments`),
    {
      data: [preprod_env2],
    }
  ).as("getEnvironments");
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
