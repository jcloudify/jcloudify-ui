import {
  it_app,
  it_installation,
  it_pat,
  it_yumeT023,
  it_environment_config,
} from "../../fixtures/ops.data.ts";
import {jcloudify} from "../../support/util";

describe("Create deployment", () => {
  const app = it_app(Date.now() /* timestamp */);

  specify("create app and [PROD] environment", () => {
    cy.intercept("PUT", jcloudify(`/users/*/applications`)).as("createApp");
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

    cy.getByName("name").type(app.name);

    cy.muiSelect("[data-testid='select-installation-id']", it_installation.id);

    cy.get("[name='github_repository.name']").type(app.repo.name);
    cy.get("[name='github_repository.description']").type(app.repo.description);

    cy.get("[aria-label='Save']").click();
    cy.wait("@createApp")
      .its("response")
      .then(({body}) => {
        const {
          data: [created],
        } = body;
        const appId = created.id;

        cy.writeFile("target-app-id.txt", appId);

        cy.getByTestid(`show-${appId}-app`).click({force: true});
        cy.getByHref(`/applications/${appId}/show/environments`).click();

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
});
