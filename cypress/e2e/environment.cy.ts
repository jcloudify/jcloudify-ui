import {EnvironmentType as EnvironmentTypeEnum} from "@jcloudify-api/typescript-client";
import {user1} from "../fixtures/user.mock";
import {app1, app2} from "../fixtures/application.mock";
import {app1_prod_stack_outputs} from "../fixtures/stack.mock";
import {prod_env} from "../fixtures/environment.mock";
import {preprod_env2_conf1} from "../fixtures/config.mock";
import {jcloudify} from "../support/util";

describe("Environment", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  context("Read", () => {
    specify("Display environments for the viewed app", () => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.wait("@getEnvironments");
      cy.wait("@getDeployments");
      cy.wait("@getEnvBillingInfo");

      cy.contains("Prod");

      cy.contains("poja: gen");
      cy.contains("fdf8268");
      cy.contains("$ 7.25");
    });

    specify("Shows the clicked environment details", () => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});

      cy.wait("@getEnvironments");
      cy.wait("@getDeployments");
      cy.wait("@getEnvBillingInfo");

      cy.getByTestid(`environment-${prod_env.id}`).click();

      cy.wait("@getEnvironmentById");

      cy.wait("@getEnvironmentStacks");
      cy.wait("@getEnvironmentStackOutputs");
      cy.contains(app1_prod_stack_outputs[0].value! /* ApiUrl */);

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

    context("Diff", () => {
      specify(
        "can only see diff when the 2 available environment are created",
        () => {
          cy.getByTestid(`show-${app1.id}-app`).click({force: true});
          cy.getByHref(`/applications/${app1.id}/show/environments`).click();
          cy.wait("@getEnvironments");
          cy.wait("@getDeployments");
          cy.wait("@getEnvBillingInfo");
          cy.contains("Diff").should("not.have.attr", "aria-disabled");

          cy.getByHref(`/applications`).click();
          cy.getByTestid(`show-${app2.id}-app`).click({force: true});
          cy.getByHref(`/applications/${app2.id}/show/environments`).click();
          cy.wait("@getEnvironments");
          cy.wait("@getDeployments");
          cy.wait("@getEnvBillingInfo");
          cy.contains("Diff").should("have.attr", "aria-disabled", "true");
        }
      );

      specify("Compare Environment Differences", () => {
        cy.getByTestid(`show-${app1.id}-app`).click({force: true});
        cy.getByHref(`/applications/${app1.id}/show/environments`).click();
        cy.wait("@getEnvironments");
        cy.wait("@getDeployments");
        cy.wait("@getEnvBillingInfo");
        cy.contains("Diff").click();

        cy.contains("Environment Diff");
        cy.contains("Compare Environment Differences");

        cy.wait("@getEnvironments");
        cy.wait("@getEnvironmentConfig");
        // TODO: a way to test this in a better way
      });
    });
  });

  context("Create environment", () => {
    specify("Deactivate activated ones", () => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.getByHref(`/applications/${app1.id}/show/environments`).click();

      cy.intercept(
        "PUT",
        jcloudify(`/users/${user1.id}/applications/${app1.id}/environments`),
        (req) => {
          return req.reply({...req, statusCode: 201});
        }
      ).as("DeactivatePreprodEnvironment");

      cy.wait("@getEnvironments");
      cy.wait("@getDeployments");
      cy.wait("@getEnvBillingInfo");

      cy.get(`.PREPROD-environment-card [aria-label='Deactivate']`).click();
      cy.contains("Confirm").click();
      cy.wait("@DeactivatePreprodEnvironment");

      cy.get(`.PREPROD-environment-card [aria-label='Activate']`).should(
        "exist"
      );
    });

    specify("Activate deactivated ones", () => {
      cy.getByTestid(`show-${app2.id}-app`).click({force: true});
      cy.getByHref(`/applications/${app2.id}/show/environments`).click();

      cy.intercept(
        "PUT",
        jcloudify(`/users/${user1.id}/applications/${app2.id}/environments`),
        (req) => {
          const [env] = req.body.data;
          expect(env.environment_type).to.eq(EnvironmentTypeEnum.PROD);
          return req.reply({...req, statusCode: 200});
        }
      ).as("ActivateProd");

      cy.intercept(
        "PUT",
        jcloudify(
          `/users/${user1.id}/applications/${app2.id}/environments/*/config`
        ),
        (req) => {
          const {id, ...conf} = req.body;
          expect(conf).to.deep.eq(preprod_env2_conf1);
          return req.reply({...req, statusCode: 200});
        }
      ).as("ActivateProdConfFromPreprod");

      cy.wait("@getEnvironments");
      cy.wait("@getDeployments");
      cy.wait("@getEnvBillingInfo");

      cy.get(`.PROD-environment-card [aria-label='Activate']`).click();

      cy.wait("@getEnvironmentConfig");
      cy.wait("@ActivateProd");
      cy.wait("@ActivateProdConfFromPreprod");

      cy.get(`.PROD-environment-card [aria-label='Activate']`).click();
    });
  });
});
