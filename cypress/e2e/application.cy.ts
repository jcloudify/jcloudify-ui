import {app1, app2} from "../fixtures/application.mock";

describe("Application", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getByHref(`/applications`).click();
  });

  context("list", () => {
    it("should show deployed url and healthy flag when state is 'HEALTHY'", () => {
      cy.getByTestid(`applications-${app1.id}`).contains("healthy");
      cy.getByTestid(`applications-${app1.id}`).contains(app1.name);
      cy.getByTestid(`applications-${app1.id}`).contains(app1.deployed_url);
      cy.getByTestid(`applications-${app1.id}`).contains(
        app1.github_repository
      );
    });

    it("should show unhealthy flag when state is 'UNHEALTHY'", () => {
      cy.getByTestid(`applications-${app2.id}`).contains("unhealthy");
      cy.getByTestid(`applications-${app2.id}`).contains(app2.name);
      cy.getByTestid(`applications-${app2.id}`).should(
        "not.contain",
        app2.deployed_url
      );
      cy.getByTestid(`applications-${app2.id}`).contains(
        app2.github_repository
      );
    });
  });

  context("show", () => {
    context("environment", () => {
      specify("List available environment for the viewed app", () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});

        cy.contains("prod_env");
        cy.contains("PROD");

        cy.contains("preprod_env");
        cy.contains("PREPROD");

        cy.getByHref(`/applications`).click();
        cy.getByTestid(`show-${app2.id}-app`).click({force: true});

        cy.contains("preprod_env2");
        cy.contains("PREPROD");
      });

      specify("Shows the selected environment's variables", () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});

        cy.contains("prod_env").click();

        cy.contains(`"PROD" Env variables`);

        cy.getByName("variables.0.name").should("have.value", "region");
        cy.getByName("variables.0.value").should("have.value", "eu-west-3");

        cy.getByName("variables.1.name").should("have.value", "bucket-name");
        cy.getByName("variables.1.value").should("have.value", "poja-bucket");
      });

      // TODO: remove field, remove existent env var
      specify.only(
        "Allows to 'update, add another, delete' variables for an environment",
        () => {
          cy.getByTestid(`show-${app1.id}-app`).click({force: true});
          cy.contains("prod_env").click();

          cy.contains(`"PROD" Env variables`);

          // edit
          cy.getByName("variables.0.name").clear().type("AMPLIFY_POOL_ID");
          cy.getByName("variables.0.value")
            .clear()
            .type("new-amplify-pool-gid");

          // add
          cy.getByTestid("AddAnotherEnvVar").click();
          cy.getByName("variables.2.name").clear().type("NEW_ENV_KEY");
          cy.getByName("variables.2.value").clear().type("new-env-val");

          // shows
          cy.getByName("variables.0.name").should(
            "have.value",
            "AMPLIFY_POOL_ID"
          );
          cy.getByName("variables.0.value").should(
            "have.value",
            "new-amplify-pool-gid"
          );
          cy.getByName("variables.2.name").should("have.value", "NEW_ENV_KEY");
          cy.getByName("variables.2.value").should("have.value", "new-env-val");
        }
      );
    });
  });
});
