import {
  it_app,
  it_installation,
  it_pat,
  it_yumeT023,
} from "../../fixtures/ops.data.ts";
import {jcloudify} from "../../support/util";

describe("Create deployment", () => {
  specify("create app and [PREPROD] environment", () => {
    cy.intercept("GET", jcloudify(`/whoami`)).as("whoami");

    cy.intercept("PUT", jcloudify(`/users/${it_yumeT023.id}/applications`)).as("createApp");

    cy.intercept(
      "GET",
      jcloudify(`/users/${it_yumeT023.id}/applications?page=*&page_size=*`),
    ).as("getApps");

    cy.intercept(
      "PUT",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/*/environments`
      )).as("createPreprodEnv");

    cy.intercept(
      "PUT",
      jcloudify(`/users/${it_yumeT023.id}/applications/*/environments/*/config`)).as("createPreprodEnvConf");

    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/*/environments/*`
      )).as("getEnv");

    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/*/environments/*/config`
      )).as("getEnvConf");

    cy.intercept("GET", jcloudify(`/users/${it_yumeT023.id}/applications/*`)).as("getApp");

    cy.withToken(it_pat);

    cy.visit("/");

    cy.wait("@whoami");
    cy.wait("@getApps");

    cy.get('[href="/applications/create/new"]').click();

    cy.getByName("name").type(it_app.name);
    cy.getByName("package_name").clear().type(it_app.package_name);

    cy.muiSelect("[data-testid='select-installation-id']", it_installation.id);

    cy.get("[name='github_repository.name']").type(it_app.repo.name);
    cy.get("[name='github_repository.description']").type(
      it_app.repo.description
    );

    cy.get("[aria-label='Save']").click();
    cy.wait("@createApp");
    cy.contains("Setting up the Preprod environment");

    cy.wait("@getApp");
    cy.wait(10 * 1000);

    cy.wait("@createPreprodEnv");
    cy.wait("@createPreprodEnvConf");

    cy.contains("Preprod environment created successfully");

    cy.wait("@getEnv");
    cy.wait("@getEnvConf");

    // redirected to environment details
    cy.contains("Preprod");
    cy.contains("3.6.2");
  });
});
