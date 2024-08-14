import {user1} from "../fixtures/user.mock";
import {app1, app2} from "../fixtures/application.mock";

describe("Environment", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  context("Read", () => {
    specify("List available environment for the viewed app", () => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.wait("@getEnvironments");

      cy.contains("prod_env");
      cy.contains("Prod");

      cy.contains("preprod_env");
      cy.contains("Preprod");

      cy.getByHref(`/applications`).click();
      cy.getByTestid(`show-${app2.id}-app`).click({force: true});
      cy.wait("@getEnvironments");

      cy.contains("preprod_env2");
      cy.contains("Preprod");
    });

    specify("Shows the clicked environment details", () => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.contains("prod_env").click();

      cy.wait("@getEnvironmentById");

      cy.contains("Prod");

      // env variables
      cy.getByTestid("custom_java_env_vars_accordion").click();
      cy.get("#custom_java_env_vars-0-key").contains("region");
      cy.get("#custom_java_env_vars-0-value").contains("eu-west-3");
      cy.get("#custom_java_env_vars-1-key").contains("bucket-name");
      cy.get("#custom_java_env_vars-1-value").contains("poja-bucket");

      // repositories
      cy.getByTestid("custom_java_deps_accordion").click();
      cy.get("#custom_java_deps-0-string-value").contains("lombok");
      cy.get("#custom_java_deps-1-string-value").contains("tika");
      cy.get("#custom_java_deps-2-string-value").contains("guava");

      // repositories
      cy.getByTestid("custom_java_repositories_accordion").click();
      cy.get("#custom_java_repositories-0-string-value").contains("mavenLocal");
      cy.get("#custom_java_repositories-1-string-value").contains(
        "gradleLocal"
      );
    });

    specify("Compare Environment Differences", () => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.getByHref(`/applications/${app1.id}/show/environments`).click();
      cy.contains("Diff").click();

      cy.contains("Environment Diff");
      cy.contains("Compare Environment Differences");

      cy.muiSelect("#select-env-0", "prod_env");
      cy.muiSelect("#select-env-1", "preprod_env");

      cy.wait("@getEnvironments");
      cy.wait("@getEnvironmentConfig");
      // TODO: a way to test this in a better way
    });
  });

  context("Create environment", () => {
    specify(
      "Create button is disabled when there is no available environment to create",
      () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});
        cy.getByHref(`/applications/${app1.id}/show/environments`).click();
        cy.contains("Create").should("have.attr", "aria-disabled", "true");
      }
    );

    specify(
      "Create button is enabled when there is available environment to create",
      () => {
        cy.getByTestid(`show-${app2.id}-app`).click({force: true});
        cy.getByHref(`/applications/${app2.id}/show/environments`).click();
        cy.contains("Create").should("not.have.attr", "aria-disabled");
      }
    );

    specify("(ui flow)from scratch", () => {
      cy.getByTestid(`show-${app2.id}-app`).click({force: true});
      cy.getByHref(`/applications/${app2.id}/show/environments`).click();

      cy.wait("@getEnvironments");

      cy.contains("Create").click();
      cy.getByTestid("CreateFromScratch").click();
      cy.contains("From scratch");
    });

    specify("(ui flow) from an existing one, create an available", () => {
      cy.getByTestid(`show-${app2.id}-app`).click({force: true});
      cy.getByHref(`/applications/${app2.id}/show/environments`).click();

      cy.wait("@getEnvironments");

      cy.contains("Create").click();
      cy.muiSelect("#select-creation-template", "preprod_env2");
      cy.getByTestid("CreateFromExisting").click();
      cy.contains("From Preprod");
    });
  });
});
