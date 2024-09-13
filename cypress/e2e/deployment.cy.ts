import {user1} from "../fixtures/user.mock";
import {app1, app2} from "../fixtures/application.mock";
import {depl1, depl2, depl3} from "../fixtures/deployment.mock";

describe("Deployment", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  context("Filter", () => {
    beforeEach(() => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.contains("Deployments");
      cy.wait("@getEnvironments");
      cy.wait("@getDeployments");
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

  specify.skip("depl metadata (failed)", () => {
    cy.getByTestid(`show-${app2.id}-app`).click({force: true});
    cy.getByHref(`/applications/${app2.id}/show/deployments`).click();

    cy.getByTestid(`depl-${depl3.id}`).contains("prod");
    cy.getByTestid(`depl-${depl3.id}`).contains(
      `by ${depl3.creator?.username}`
    );
    cy.getByTestid(`depl-${depl3.id}`).contains("Failed");
  });

  specify.skip(
    "depl details are shown when an entry is clicked [READY]",
    () => {
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
    }
  );

  specify.skip(
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
