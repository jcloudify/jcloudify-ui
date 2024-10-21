import {
  DatabaseConf1WithDatabaseEnum,
  PojaConf1,
} from "@jcloudify-api/typescript-client";
import {app2} from "../fixtures/application.mock";
import {user1} from "../fixtures/user.mock";
import {
  custom_java_deps,
  custom_java_env_vars,
  custom_java_repositories,
  with_database_aurora_postgres,
  with_database_non_poja_managed,
  with_database_none,
  with_database_sqlite,
  with_gen_api_client_disabled,
  with_gen_api_client_enabled,
  with_publish_to_npm_registry,
} from "../fixtures/poja-conf-v1";
import {jcloudify, putRecordOnEditor, putStringArray} from "../support/util";
import {removeNestedUndefined} from "../../src/utils/object";

// TODO: to unit test every poja public version
describe.skip("PojaConfV1", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();

    cy.getByTestid(`show-${app2.id}-app`).click({force: true});
    cy.getByHref(`/applications/${app2.id}/show/environments`).click();

    cy.wait("@getEnvironments");

    cy.intercept(
      "PUT",
      jcloudify("/users/*/applications/*/environments"),
      (req) => {
        req.reply({
          statusCode: 201,
          body: req.body,
        });
      }
    ).as("createEnvironment");

    cy.contains("Create").click();
    cy.getByTestid("CreateFromScratch").click();

    cy.wait("@getPojaVersions");
    cy.getByName("general.package_full_name").clear().type("com.mock.app");
  });

  context("PojaConfFormat", () => {
    afterEach(() => {
      cy.get("[aria-label='Create']").click();
      cy.wait("@createEnvironment");
      cy.wait("@saveConfig");
    });

    context("Gen API client", () => {
      specify("with gen_api_client disabled", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.gen_api_client).to.deep.eq(
              with_gen_api_client_disabled.gen_api_client
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");
      });

      specify("with gen_api_client enabled", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.gen_api_client).to.deep.eq(
              with_gen_api_client_enabled.gen_api_client
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");

        cy.getByName("__flags.with_gen_clients").click();
        cy.getByName(
          "gen_api_client.ts_client_default_openapi_server_url"
        ).type(
          with_gen_api_client_enabled.gen_api_client
            .ts_client_default_openapi_server_url!
        );
        cy.getByName("gen_api_client.ts_client_api_url_env_var_name").type(
          with_gen_api_client_enabled.gen_api_client
            .ts_client_api_url_env_var_name!
        );
      });

      specify("with publish_to_npm_registry", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.gen_api_client).to.deep.eq(
              with_publish_to_npm_registry.gen_api_client
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");

        cy.getByName("__flags.with_gen_clients").click();
        cy.getByName("gen_api_client.with_publish_to_npm_registry").click();
        cy.getByName(
          "gen_api_client.ts_client_default_openapi_server_url"
        ).type(
          with_publish_to_npm_registry.gen_api_client
            .ts_client_default_openapi_server_url!
        );
        cy.getByName("gen_api_client.ts_client_api_url_env_var_name").type(
          with_publish_to_npm_registry.gen_api_client
            .ts_client_api_url_env_var_name!
        );
        cy.getByName("gen_api_client.codeartifact_repository_name").type(
          with_publish_to_npm_registry.gen_api_client
            .codeartifact_repository_name!
        );
        cy.getByName("gen_api_client.codeartifact_domain_name").type(
          with_publish_to_npm_registry.gen_api_client.codeartifact_domain_name!
        );
        cy.getByName("gen_api_client.aws_account_id").type(
          String(with_publish_to_npm_registry.gen_api_client.aws_account_id!)
        );
      });
    });

    context("Database", () => {
      specify("with DB 'NONE'", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.database).to.deep.eq(
              removeNestedUndefined(with_database_none.database)
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");

        cy.muiSelect(
          "[data-testid='database.with_database']",
          DatabaseConf1WithDatabaseEnum.NONE
        );
      });

      specify("with DB 'NON_POJA_MANAGED'", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.database).to.deep.eq(
              removeNestedUndefined(with_database_non_poja_managed.database)
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");

        cy.muiSelect(
          "[data-testid='database.with_database']",
          DatabaseConf1WithDatabaseEnum.NON_POJA_MANAGED_POSTGRES
        );
      });

      specify("with DB 'AURORA_POSTGRES'", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.database).to.deep.eq(
              removeNestedUndefined(with_database_aurora_postgres.database)
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");

        cy.muiSelect(
          "[data-testid='database.with_database']",
          DatabaseConf1WithDatabaseEnum.AURORA_POSTGRES
        );
        (
          [
            "database_non_root_username",
            "database_non_root_password",
            "prod_db_cluster_timeout",
            "aurora_min_capacity",
            "aurora_max_capacity",
            "aurora_scale_point",
            "aurora_sleep",
          ] as const
        ).forEach((key) => {
          cy.getByName(`database.${key}`)
            .clear()
            .type(String(with_database_aurora_postgres.database[key]));
        });
        if (with_database_aurora_postgres.database.aurora_auto_pause) {
          cy.getByName("database.aurora_auto_pause").click();
        }
      });

      specify("with DB 'SQLITE'", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.database).to.deep.eq(
              removeNestedUndefined(with_database_sqlite.database)
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");
        cy.muiSelect(
          "[data-testid='database.with_database']",
          DatabaseConf1WithDatabaseEnum.SQLITE
        );
      });
    });

    context("General", () => {
      specify("env vars, deps, repos", () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            const pojaConf = req.body as PojaConf1;
            expect(pojaConf.general?.package_full_name).to.be.eq(
              "com.mock.app"
            );
            expect(pojaConf.general?.custom_java_env_vars).to.deep.eq(
              custom_java_env_vars
            );
            expect(pojaConf.general?.custom_java_repositories).to.deep.eq(
              custom_java_repositories
            );
            expect(pojaConf.general?.custom_java_deps).to.deep.eq(
              custom_java_deps
            );
            req.reply({
              statusCode: 201,
              body: pojaConf,
            });
          }
        ).as("saveConfig");

        cy.getByTestid("custom_java_env_vars_accordion").click();
        putRecordOnEditor("custom_java_env_vars", custom_java_env_vars);

        cy.getByTestid("custom_java_repositories_accordion").click();
        putStringArray("custom_java_repositories", custom_java_repositories);

        cy.getByTestid("custom_java_deps_accordion").click();
        putStringArray("custom_java_deps", custom_java_deps);
      });
    });
  });

  context("Server Side Validation", () => {
    specify(
      "Display 400_BadRequest error message to corresponding inputs",
      () => {
        cy.intercept(
          "PUT",
          jcloudify("/users/*/applications/*/environments/*/config"),
          (req) => {
            req.reply({
              statusCode: 400,
              body: {
                message: `general.package_full_name must be three parts separated by dot. emailing.ses_source must be valid mail.`,
              },
            });
          }
        ).as("saveConfig");

        cy.getByName("general.package_full_name").type("com.mock"); // 2 parts
        cy.getByName("emailing.ses_source").type("invalid_mail");

        cy.get("[aria-label='Create']").click();
        cy.wait("@createEnvironment");
        cy.wait("@saveConfig");

        cy.contains("must be three parts separated by dot");
        cy.contains("must be valid mail");
      }
    );
  });
});
