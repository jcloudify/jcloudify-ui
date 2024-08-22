/// <reference types="cypress" />

import {
  preprod_env,
  preprod_env2,
  prod_env,
} from "../fixtures/environment.mock";
import {user1} from "../fixtures/user.mock";
import {app1, app2, apps} from "../fixtures/application.mock";
import {user1_installations} from "../fixtures/installation.mock";
import {stacks} from "../fixtures/stack.mock";
import {preprod_env_conf1, prod_env_conf1} from "../fixtures/config.mock";
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
  cy.get(selector).click({force: true});
  cy.get(`[data-value="${value}"]`).click();
});

Cypress.Commands.add("muiSelect2", (formControl, optionText) => {
  cy.get(formControl).click({force: true});
  cy.contains(optionText).click({force: true});
});

Cypress.Commands.add("muiClear", (selector) => {
  cy.get(selector).click({force: true});
  cy.get('[aria-label="Clear value"]').click();
});

Cypress.Commands.add("mockToken", (token) => {
  return cy.intercept("GET", jcloudify("/token?code=*"), token);
});

Cypress.Commands.add("mockApiGet", () => {
  cy.intercept("GET", jcloudify(`/users/*/applications?page=*&page_size=*`), {
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
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments/prod_env`),
    prod_env
  ).as("getEnvironmentById");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments/preprod_env`),
    preprod_env
  ).as("getEnvironmentById");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app2.id}/environments/preprod_env2`),
    preprod_env2
  ).as("getEnvironmentById");

  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments/prod_env/config`),
    prod_env_conf1
  ).as("getEnvironmentConfig");
  cy.intercept(
    "GET",
    jcloudify(
      `/users/*/applications/${app1.id}/environments/preprod_env/config`
    ),
    preprod_env_conf1
  ).as("getEnvironmentConfig");

  cy.intercept("GET", jcloudify(`/users/${user1.id}/installations`), {
    data: user1_installations,
  }).as("getUserInstallations");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${prod_env.id}/stacks`
    ),
    {
      data: stacks[app1.id][prod_env.id],
    }
  );
  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${preprod_env.id}/stacks`
    ),
    {
      data: stacks[app1.id][preprod_env.id],
    }
  );
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
