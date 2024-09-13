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
      cy.getByName("startDatetime").type("2024-01-01");
      cy.getByName("endDatetime").type("2024-01-05");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").type("2024-01-01");
      cy.getByName("endDatetime").type("2024-01-03");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

      cy.getByName("startDatetime").type("2024-01-04");
      cy.getByName("endDatetime").type("2024-01-10");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").clear();
      cy.getByName("endDatetime").type("2024-01-04");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").clear().blur();
      cy.getByName("endDatetime").type("2024-01-02");
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("not.exist");

      cy.getByName("startDatetime").type("2024-01-02");
      cy.getByName("endDatetime").clear().blur();
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");

      cy.getByName("startDatetime").type("2024-01-04");
      cy.getByName("endDatetime").clear().blur();
      cy.wait("@getDeployments");
      cy.getByTestid(`depl-${depl1.id}`).should("not.exist");
      cy.getByTestid(`depl-${depl2.id}`).should("exist");
    });
  });

  specify("deployment github metadata", () => {
    cy.getByTestid(`show-${app1.id}-app`).click({force: true});
    cy.getByHref(`/applications/${app1.id}/show/deployments`).click();

    cy.getByTestid(`depl-${depl1.id}`).contains("prod");
    cy.getByTestid(`depl-${depl1.id}`).contains(
      `by ${depl1.creator?.username}`
    );

    cy.getByTestid(`depl-${depl2.id}`).contains("preprod");
    cy.getByTestid(`depl-${depl2.id}`).contains(
      `by ${depl2.creator?.username}`
    );

    cy.getByHref(
      `https://github.com/${depl1.github_meta?.org}/${depl1.github_meta?.repo_name}/tree/prod`
    ).should("exist");
    cy.getByHref(
      `https://github.com/${depl2.github_meta?.org}/${depl2.github_meta?.repo_name}/tree/preprod`
    ).should("exist");

    cy.getByHref(
      `https://github.com/${depl1.github_meta?.org}/${depl1.github_meta?.repo_name}/commit/${depl1.github_meta?.commit_sha}`
    ).should("exist");
    cy.getByHref(
      `https://github.com/${depl2.github_meta?.org}/${depl2.github_meta?.repo_name}/commit/${depl2.github_meta?.commit_sha}`
    ).should("exist");

    cy.getByHref(`https://github.com/${depl2.creator?.username}`).should(
      "exist"
    );
    cy.getByHref(`https://github.com/${depl1.creator?.username}`).should(
      "exist"
    );
  });
});
