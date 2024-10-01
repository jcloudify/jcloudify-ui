import {user1} from "../fixtures/user.mock";
import {app1} from "../fixtures/application.mock";
import {depl1, depl2} from "../fixtures/deployment.mock";
import {
  deploy_complete,
  deploy_failed,
  deploy_inProgress,
  templateCheck_failed,
  templateCheck_inProgress,
  provision_failed,
  provision_inProgress,
} from "../fixtures/deployment-state.mock";
import {app1_prod_stack_outputs} from "../fixtures/stack.mock";
import {STATUS} from "../../src/operations/deployments/state";

describe("Deployment", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  context("Filter", () => {
    beforeEach(() => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.contains("Deployments").click();
      cy.wait("@getEnvironments");
      cy.wait("@getDeployments");
    });

    specify("Environment", () => {
      cy.muiSelect("[data-testid='env-type']", "PROD");

      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

      cy.muiSelect("[data-testid='env-type']", "PREPROD");

      cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.muiSelect("[data-testid='env-type']", "All Environments");

      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");
    });

    specify("Date Range", () => {
      cy.getByName("startDatetime").type("2024-01-01T00:00");
      cy.getByName("endDatetime").type("2024-01-05T00:00");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").type("2024-01-01T00:00");
      cy.getByName("endDatetime").type("2024-01-03T00:00");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

      cy.getByName("startDatetime").type("2024-01-04T00:00");
      cy.getByName("endDatetime").type("2024-01-10T00:00");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").clear();
      cy.getByName("endDatetime").type("2024-01-04T00:00");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").clear().blur();
      cy.getByName("endDatetime").type("2024-01-02T00:00");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

      cy.getByName("startDatetime").type("2024-01-02T00:00");
      cy.getByName("endDatetime").clear().blur();
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").type("2024-01-04T00:00");
      cy.getByName("endDatetime").clear().blur();
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");
    });
  });

  specify("deployment github metadata", () => {
    cy.getByTestid(`show-${app1.id}-app`).click({force: true});
    cy.getByHref(`/applications/${app1.id}/show/deployments`).click();

    cy.getByTestid(`depl-${depl1.id}`).contains("Prod");
    cy.getByTestid(`depl-${depl1.id}`).contains(
      `by ${depl1.github_meta?.commit?.committer?.name}`
    );

    cy.getByTestid(`depl-${depl2.id}`).contains("Preprod");
    cy.getByTestid(`depl-${depl2.id}`).contains(
      `by ${depl2.github_meta?.commit?.committer?.name}`
    );

    cy.getByHref(
      `https://github.com/${depl1.github_meta?.repo?.owner_name}/${depl1.github_meta?.repo?.name}/tree/prod`
    ).should("exist");
    cy.getByHref(
      `https://github.com/${depl2.github_meta?.repo?.owner_name}/${depl2.github_meta?.repo?.name}/tree/preprod`
    ).should("exist");

    cy.getByHref(
      `https://github.com/${depl1.github_meta?.repo?.owner_name}/${depl1.github_meta?.repo?.name}/commit/${depl1.github_meta?.commit?.sha}`
    ).should("exist");
    cy.getByHref(
      `https://github.com/${depl2.github_meta?.repo?.owner_name}/${depl2.github_meta?.repo?.name}/commit/${depl2.github_meta?.commit?.sha}`
    ).should("exist");

    cy.getByHref(
      `https://github.com/${depl1.github_meta?.commit?.committer?.name}`
    ).should("exist");
    cy.getByHref(
      `https://github.com/${depl2.github_meta?.commit?.committer?.name}`
    ).should("exist");
  });

  specify("clicked deployment details", () => {
    cy.getByTestid(`show-${app1.id}-app`).click({force: true});
    cy.getByHref(`/applications/${app1.id}/show/deployments`).click();

    cy.getByTestid(`show-${depl1.id}-depl`).click({force: true});
    cy.wait("@getDeploymentById");
    cy.wait("@getDeploymentConfig");

    cy.contains("Prod");
    cy.contains(depl1.github_meta?.commit?.message!);
    cy.contains(depl1.github_meta?.commit?.sha?.slice(0, 7)!);
    cy.getByHref(
      `https://github.com/${depl1.github_meta?.repo?.owner_name}/${depl1.github_meta?.repo?.name}/commit/${depl1.github_meta?.commit?.sha}`
    ).should("exist");

    // env variables
    cy.getByTestid("custom_java_env_vars_accordion").click();
    cy.get("#custom_java_env_vars-0-key").contains("region");
    cy.get("#custom_java_env_vars-0-value").contains("eu-west-2");
    cy.get("#custom_java_env_vars-1-key").contains("bucket-name");
    cy.get("#custom_java_env_vars-1-value").contains("dray-bucket");
    cy.get("#custom_java_env_vars-2-key").contains("awsAccessKey");
    cy.get("#custom_java_env_vars-2-value").contains("access_key");
  });

  context("Deployment state", () => {
    beforeEach(() => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.getByHref(`/applications/${app1.id}/show/deployments`).click();

      cy.getByTestid(`show-${depl1.id}-depl`).click({force: true});
      cy.wait("@getDeploymentById");
      cy.wait("@getDeploymentConfig");
    });

    specify("Template check IN_PROGRESS", () => {
      cy.intercept(
        `users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/states`,
        templateCheck_inProgress
      ); // 1

      // 1
      cy.get("[data-checkpoint='Template check']").should(
        "have.attr",
        "data-status",
        STATUS.IN_PROGRESS
      );
      cy.get("[data-checkpoint='Provision']").should(
        "have.attr",
        "data-status",
        STATUS.PENDING
      );
      cy.get("[data-checkpoint='Deploy']").should(
        "have.attr",
        "data-status",
        STATUS.PENDING
      );
    });

    specify("Provision IN_PROGRESS", () => {
      cy.intercept(
        `users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/states`,
        provision_inProgress
      ); // 2

      cy.get("[data-checkpoint='Template check']").should(
        "have.attr",
        "data-status",
        STATUS.COMPLETED
      );
      cy.get("[data-checkpoint='Provision']").should(
        "have.attr",
        "data-status",
        STATUS.IN_PROGRESS
      );
      cy.get("[data-checkpoint='Deploy']").should(
        "have.attr",
        "data-status",
        STATUS.PENDING
      );
    });

    specify("Deploy IN_PROGRESS", () => {
      cy.intercept(
        `users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/states`,
        deploy_inProgress
      ); // 3

      cy.get("[data-checkpoint='Template check']").should(
        "have.attr",
        "data-status",
        STATUS.COMPLETED
      );
      cy.get("[data-checkpoint='Provision']").should(
        "have.attr",
        "data-status",
        STATUS.COMPLETED
      );
      cy.get("[data-checkpoint='Deploy']").should(
        "have.attr",
        "data-status",
        STATUS.IN_PROGRESS
      );
    });

    specify("Template check FAILED", () => {
      cy.intercept(
        `users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/states`,
        templateCheck_failed
      ); // 4

      cy.get("[data-checkpoint='Template check']").should(
        "have.attr",
        "data-status",
        STATUS.FAILED
      );
      cy.get("[data-checkpoint='Provision']").should(
        "have.attr",
        "data-status",
        STATUS.PENDING
      );
      cy.get("[data-checkpoint='Deploy']").should(
        "have.attr",
        "data-status",
        STATUS.PENDING
      );
    });

    specify("Provision FAILED", () => {
      cy.intercept(
        `users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/states`,
        provision_failed
      ); // 5

      cy.get("[data-checkpoint='Template check']").should(
        "have.attr",
        "data-status",
        STATUS.COMPLETED
      );
      cy.get("[data-checkpoint='Provision']").should(
        "have.attr",
        "data-status",
        STATUS.FAILED
      );
      cy.get("[data-checkpoint='Deploy']").should(
        "have.attr",
        "data-status",
        STATUS.PENDING
      );
    });

    specify("Deploy FAILED", () => {
      cy.intercept(
        `users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/states`,
        deploy_failed
      ); // 6

      cy.get("[data-checkpoint='Template check']").should(
        "have.attr",
        "data-status",
        STATUS.COMPLETED
      );
      cy.get("[data-checkpoint='Provision']").should(
        "have.attr",
        "data-status",
        STATUS.COMPLETED
      );
      cy.get("[data-checkpoint='Deploy']").should(
        "have.attr",
        "data-status",
        STATUS.FAILED
      );
    });

    specify("Deploy COMPLETED", () => {
      cy.intercept(
        `users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/states`,
        deploy_complete
      ); // 7

      cy.contains("Deployment Completed Successfully");

      cy.wait("@getEnvironmentStacks");
      cy.wait("@getEnvironmentStackOutputs");
      cy.contains(app1_prod_stack_outputs[0].value! /* ApiUrl */);
    });
  });
});
