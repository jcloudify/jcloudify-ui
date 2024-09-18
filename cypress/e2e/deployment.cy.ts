import {user1} from "../fixtures/user.mock";
import {app1} from "../fixtures/application.mock";
import {depl1, depl2} from "../fixtures/deployment.mock";

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
});
