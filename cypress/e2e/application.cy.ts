import {user1} from "../fixtures/user.mock";
import {app1, app2} from "../fixtures/application.mock";
import {depl1, depl2, depl3} from "../fixtures/deployment.mock";
import {stripPrefix} from "../../src/utils/str";
import {log1, log2} from "../fixtures/logs.mock";

describe("Application", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.getByHref(`/applications`).click();
  });

  context("list", () => {
    it("should show healthy flag when state is 'HEALTHY'", () => {
      cy.getByTestid(`applications-${app1.id}`).contains("healthy");
      cy.getByTestid(`applications-${app1.id}`).contains(app1.name);
      cy.getByTestid(`applications-${app1.id}`).contains(
        stripPrefix(app1.github_repository, "https://github.com/")
      );
    });

    it("should show unhealthy flag when state is 'UNHEALTHY'", () => {
      cy.getByTestid(`applications-${app2.id}`).contains("unhealthy");
      cy.getByTestid(`applications-${app2.id}`).contains(app2.name);
      cy.getByTestid(`applications-${app2.id}`).contains(
        stripPrefix(app2.github_repository, "https://github.com/")
      );
    });

    context("logs", () => {
      specify("Show all available logs", () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});
        cy.get('[href="/applications/app1/show/logs"]').click();
        cy.contains(log1.id);
        cy.contains(log1.log_type);
        cy.contains(log1.log_file_uri);
        cy.contains(log2.id);
        cy.contains(log2.log_type);
        cy.contains(log2.log_file_uri);
      });
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

      specify(
        "Save button must is only available when there is a changes made to the en variables",
        () => {
          cy.getByTestid(`show-${app1.id}-app`).click({force: true});
          cy.contains("prod_env").click();

          cy.contains(`"PROD" Env variables`);

          cy.getByTestid("SaveEnvVar").should("be.disabled");

          cy.getByTestid("AddAnotherEnvVar").click();
          cy.getByName("variables.2.name").clear().type("NEW_ENV_KEY");
          cy.getByName("variables.2.value").clear().type("new-env-val");

          cy.getByTestid("SaveEnvVar").should("be.enabled");
        }
      );

      specify(
        "Disable environment creation when both environments are created",
        () => {
          cy.getByTestid(`show-${app1.id}-app`).click({force: true});
          cy.contains("Available environments are already created");
        }
      );

      specify("Allow to create environment", () => {
        cy.getByTestid(`show-${app2.id}-app`).click({force: true});
        cy.get('[data-testid="createEnv"]').click();

        cy.contains("Create environment");
        cy.get('[data-testid="preprodEnv"]');

        cy.contains("Hobby");
        cy.contains("$0");
        cy.contains("billed once yearly");

        cy.contains("Standout feature");
        cy.contains("Up to 45% shipping discount");
        cy.contains("10 Inventory locations");
        cy.contains("24/7 chat support");
        cy.contains("Localized global selling");
        cy.contains("POS Lite");

        cy.getByTestid("plan-plan_1-card").click();
        cy.contains("Pro");
        cy.contains("$15");

        cy.getByTestid("cancelCreateEnv").click();
      });

      // TODO: remove field, remove existent env var
      specify(
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

    context("deployment", () => {
      context("Filter", () => {
        beforeEach(() => {
          cy.getByTestid(`show-${app1.id}-app`).click({force: true});
          cy.getByHref(`/applications/${app1.id}/show/deployments`).click();
        });

        specify("Environment", () => {
          cy.muiSelect("#env_type", "PROD");

          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

          cy.muiSelect("#env_type", "PREPROD");

          cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");

          cy.muiSelect("#env_type", "All Environments");

          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");
        });

        specify("Status", () => {
          cy.muiSelect("#status", "Ready");

          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

          cy.muiSelect("#status", "In Progress");

          cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");

          cy.muiSelect("#status", "Failed");

          cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
          cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

          cy.muiClear("#status");

          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");
        });

        specify("Date Range", () => {
          cy.get("#from").type("2024-01-01");
          cy.get("#to").type("2024-01-05");
          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");

          cy.get("#from").type("2024-01-01");
          cy.get("#to").type("2024-01-03");
          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

          cy.get("#from").type("2024-01-04");
          cy.get("#to").type("2024-01-10");
          cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");

          cy.get("#from").clear();
          cy.get("#to").type("2024-01-04");
          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");

          cy.get("#from").clear();
          cy.get("#to").type("2024-01-02");
          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

          cy.get("#from").type("2024-01-02");
          cy.get("#to").clear();
          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");

          cy.get("#from").type("2024-01-04");
          cy.get("#to").clear();
          cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");
        });
      });

      specify("depl metadata (warning, success)", () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});
        cy.getByHref(`/applications/${app1.id}/show/deployments`).click();

        cy.getByTestid(`depl-${depl1.id}`).contains("prod");
        cy.getByTestid(`depl-${depl1.id}`).contains(
          `by ${depl1.creator.username}`
        );
        cy.getByTestid(`depl-${depl1.id}`).contains("Ready");

        cy.getByTestid(`depl-${depl2.id}`).contains("preprod");
        cy.getByTestid(`depl-${depl2.id}`).contains(
          `by ${depl2.creator.username}`
        );
        cy.getByTestid(`depl-${depl2.id}`).contains("In Progress");

        cy.getByHref(
          `https://github.com/${depl1.github_meta.org}/${depl1.github_meta.repo}/tree/prod`
        ).should("exist");
        cy.getByHref(
          `https://github.com/${depl2.github_meta.org}/${depl2.github_meta.repo}/tree/preprod`
        ).should("exist");

        cy.getByHref(
          `https://github.com/${depl1.github_meta.org}/${depl1.github_meta.repo}/commit/${depl1.github_meta.commit_sha}`
        ).should("exist");
        cy.getByHref(
          `https://github.com/${depl2.github_meta.org}/${depl2.github_meta.repo}/commit/${depl2.github_meta.commit_sha}`
        ).should("exist");

        cy.getByHref(`https://github.com/${depl2.creator.username}`).should(
          "exist"
        );
        cy.getByHref(`https://github.com/${depl1.creator.username}`).should(
          "exist"
        );
      });

      specify("depl metadata (failed)", () => {
        cy.getByTestid(`show-${app2.id}-app`).click({force: true});
        cy.getByHref(`/applications/${app2.id}/show/deployments`).click();

        cy.getByTestid(`depl-${depl3.id}`).contains("prod");
        cy.getByTestid(`depl-${depl3.id}`).contains(
          `by ${depl3.creator.username}`
        );
        cy.getByTestid(`depl-${depl3.id}`).contains("Failed");
      });

      specify("depl details are shown when an entry is clicked [READY]", () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});
        cy.getByHref(`/applications/${app1.id}/show/deployments`).click();
        cy.getByTestid(`show-${depl1.id}-depl`).click({force: true});

        cy.contains(depl1.id);
        cy.contains("Ready");
        cy.contains("PROD");
        cy.contains("prod");
        cy.contains("fdf8268c7b3ecef9ae7298ef4acaeca38cf9d2ef".slice(0, 7));
        cy.contains("poja: bootstrap");
        cy.contains(
          "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Prod"
        );
        cy.contains("by user1");

        // TODO: depl logs
      });

      specify(
        "depl details are shown when an entry is clicked [IN_PROGRESS]",
        () => {
          cy.getByTestid(`show-${app1.id}-app`).click({force: true});
          cy.getByHref(`/applications/${app1.id}/show/deployments`).click();
          cy.getByTestid(`show-${depl2.id}-depl`).click({force: true});

          cy.contains(depl2.id);
          cy.contains("In Progress");
          cy.contains("PREPROD");
          cy.contains("preprod");
          cy.contains("eccf28034eafdb9774e721d122cbdf2c2bbfaed2".slice(0, 7));
          cy.contains("style: reformat");
          // url
          cy.contains("not available");
          cy.contains("by user1");

          // TODO: depl logs
        }
      );
    });
  });
});
