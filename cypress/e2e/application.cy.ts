import {user1} from "../fixtures/user.mock";
import {app1, app2} from "../fixtures/application.mock";
import {depl1, depl2, depl3} from "../fixtures/deployment.mock";
import {stripPrefix} from "../../src/utils/str";
import {log1, log2} from "../fixtures/logs.mock";
import {user1_installations} from "../fixtures/installation.mock";
import {prod_env_conf1} from "../fixtures/config.mock";
import {jcloudify} from "../support/util";

describe("Application", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  context("list", () => {
    it("show all apps", () => {
      cy.wait("@getApplications");

      cy.getByTestid(`applications-${app1.id}`).contains(app1.name!);
      cy.getByTestid(`applications-${app1.id}`).contains(
        stripPrefix(app1.repositoryUrl!, "https://github.com/")
      );

      cy.getByTestid(`applications-${app2.id}`).contains(app2.name!);
      cy.getByTestid(`applications-${app2.id}`).contains(
        stripPrefix(app2.repositoryUrl!, "https://github.com/")
      );
    });

    context("logs", () => {
      specify("Show all available logs", () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});
        cy.wait("@getApplications");

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

  context("create", () => {
    specify("Create new application", () => {
      cy.intercept(
        "PUT",
        jcloudify(`/users/${user1.id}/applications`),
        (req) => {
          const toCreate = req.body.data[0];
          const {name, github_repository, user_id} = toCreate;
          expect({name, github_repository, user_id}).to.deep.eq({
            user_id: user1.id,
            name: app1.name,
            github_repository: {
              installation_id: user1_installations[0].id,
              name: app1.name,
              description: app1.name,
              is_private: false,
            },
          });
          return req.reply({
            ...req,
            statusCode: 201,
          });
        }
      ).as("createNewApp");

      cy.get('[href="/applications/create/new"]').click();

      cy.wait("@getUserInstallations");

      cy.getByName("name").type(app1.name!);
      cy.muiSelect(
        "[data-testid='select-installation-id']",
        "user1_installation_1"
      );
      cy.get("[name='github_repository.name']").type(app1.name!);
      cy.get("[name='github_repository.description']").type(app1.name!);

      cy.get("[aria-label='Save']").click();
      cy.wait("@createNewApp");

      cy.pathnameEq("/applications");
    });
  });

  context("show", () => {
    context("environment", () => {
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
        cy.get("#custom_java_repositories-0-string-value").contains(
          "mavenLocal"
        );
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

      specify.only("Create new environment for an app", () => {
        cy.getByTestid(`show-${app2.id}-app`).click({force: true});
        cy.getByHref(`/applications/${app2.id}/show/environments`).click();

        cy.wait("@getEnvironments");

        cy.contains("Create").click();
        cy.getByTestid("CreateFromScratch").click();
        cy.contains("From scratch");

        cy.get('#general\\.package_full_name').type(prod_env_conf1.general?.package_full_name!)


        cy.getByTestid("custom_java_env_vars_accordion").click();
        cy.getByTestid("AddAnothercustom_java_env_vars").click();

        const recordToAdd = Object.entries(prod_env_conf1.general?.custom_java_env_vars!);
          recordToAdd
            .forEach(([key, value], idx) => {
              cy.getByName(`custom_java_env_vars.${idx}.key`).type(key);
              cy.getByName(`custom_java_env_vars.${idx}.value`).type(value);
              if (idx < recordToAdd.length) {
                cy.getByTestid("AddAnothercustom_java_env_vars").click();
              }
            })
      });

      specify.skip("Allow to create environment", () => {
        cy.getByTestid(`show-${app2.id}-app`).click({force: true});
        cy.get('[data-testid="createEnv"]').click();
      });
    });

    context.skip("deployment", () => {
      context("Filter", () => {
        beforeEach(() => {
          cy.getByTestid(`show-${app1.id}-app`).click({force: true});
          cy.getByHref(`/applications/${app1.id}/show/deployments`).click();
          cy.wait("@getEnvironments");
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

        specify("State", () => {
          cy.muiSelect("#state", "READY");

          cy.getByTestid(`depl-${depl1.id}`).should("exist");
          cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

          cy.muiSelect("#state", "IN_PROGRESS");

          cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
          cy.getByTestid(`depl-${depl2.id}`).should("exist");

          cy.muiSelect("#state", "FAILED");

          cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
          cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

          cy.muiSelect("#state", "Any");

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
        cy.contains("Prod");
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
          cy.contains("Preprod");
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
