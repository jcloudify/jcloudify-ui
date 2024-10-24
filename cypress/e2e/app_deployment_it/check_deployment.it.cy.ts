import {isValidURL} from "../../../src/utils/url";
import {it_app, it_pat, it_yumeT023} from "../../fixtures/ops.data";
import {jcloudify} from "../../support/util";

describe("Check deployment", () => {
  specify("check deployment configuration and active deployment URL", () => {
    cy.intercept("GET", jcloudify(`/whoami`)).as("whoami");

    cy.intercept(
      "GET",
      jcloudify(`/users/${it_yumeT023.id}/applications?page=*&page_size=*`)
    ).as("getApps");

    cy.intercept(
      "GET",
      jcloudify(`/users/${it_yumeT023.id}/applications/*`)
    ).as("getApp");

    cy.intercept(
      "GET",
      jcloudify(`/users/${it_yumeT023.id}/applications/*/environments`)
    ).as("getEnvs");

    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/*/environments/*/billing?startTime=*&endTime=*`
      )
    ).as("getEnvBillingInfo");

    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/*/environments/*/stacks?page=*&page_size=*`
      )
    ).as("getEnvStacks");

    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/*/environments/*/stacks/*/outputs?page=*&page_size=*`
      )
    ).as("getEnvStackOutputs");

    cy.intercept(
      jcloudify(`/users/${it_yumeT023.id}/applications/*/deployments*`)
    ).as("getDeployments");

    cy.withToken(it_pat);

    cy.visit("/");

    cy.wait("@whoami");
    cy.wait("@getApps");

    cy.get(`[data-cy='application-${it_app.name}']`).click({force: true});

    cy.wait("@getEnvs");
    cy.wait("@getDeployments");
    cy.wait("@getEnvBillingInfo");

    cy.wait("@getEnvStacks");
    cy.wait("@getEnvStackOutputs");

    cy.get("[data-cy='environment-PREPROD'] [data-testid='api-url']")
      .invoke("text")
      .then((apiUrl) => {
        expect(isValidURL(apiUrl)).to.be.true;

        cy.request("GET", `${apiUrl}/ping`).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  });
});
