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
    it("should list available environment for the viewed app", () => {
      // show app
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
  });
});
