import {
  it_app,
  it_installation,
  it_pat,
  it_yumeT023,
  it_environment_config,
  TARGET_APP_ID,
} from "../../fixtures/ops.data.ts";
import {jcloudify} from "../../support/util";

describe("Create deployment", () => {
  specify("create app and [PROD] environment", () => {
    cy.intercept("PUT", jcloudify(`/users/*/applications`), (req) => {
      req.body.data[0].id = TARGET_APP_ID;
    }).as("createApp");

    cy.intercept(
      "PUT",
      jcloudify(`/users/*/applications/*/environments/*/config`)
    ).as("createEnv");

    cy.intercept("GET", jcloudify(`/poja-versions`)).as("getPojaVersions");
    cy.intercept("GET", jcloudify(`/whoami`)).as("whoami");
    cy.intercept("GET", jcloudify(`/users/*/applications/*/environments`)).as(
      "getEnvironments"
    );

    cy.withToken(it_pat);

    cy.visit("/");

    cy.wait("@whoami");
    cy.get("[aria-label='Profile']").click();

    cy.contains(it_yumeT023.username!);
    cy.contains(it_yumeT023.email!);
    cy.get("body").click();

    cy.get('[href="/applications/create/new"]').click();

    cy.getByName("name").type(it_app.name);

    cy.muiSelect("[data-testid='select-installation-id']", it_installation.id);

    cy.get("[name='github_repository.name']").type(it_app.repo.name);
    cy.get("[name='github_repository.description']").type(
      it_app.repo.description
    );

    cy.get("[aria-label='Save']").click();
    cy.wait("@createApp");

    cy.getByTestid(`show-${it_app.id}-app`).click({force: true});
    cy.getByHref(`/applications/${it_app.id}/show/environments`).click();

    cy.contains("Create").click();
    cy.getByTestid("CreateFromScratch").click();

    cy.wait("@getEnvironments");
    cy.wait("@getPojaVersions");

    cy.muiSelect("[data-testid='environment_type']", "PROD");

    cy.muiSelect("[data-testid='poja-version']", "3.6.2");
    cy.getByName("general.package_full_name")
      .clear()
      .type(it_environment_config.general.package_full_name!);

    cy.get("[aria-label='Create']").click();

    cy.wait("@createEnv");

    // redirected to environment details
    cy.contains("Prod");
    cy.contains(it_environment_config.general.package_full_name!);
  });
});
