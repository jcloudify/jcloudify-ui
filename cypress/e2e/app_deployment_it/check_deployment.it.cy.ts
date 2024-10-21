import {isValidURL} from "../../../src/utils/url";
import {it_pat, it_yumeT023, TARGET_APP_ID} from "../../fixtures/ops.data";
import {jcloudify} from "../../support/util";

describe("Check deployment", () => {
  specify("check deployment configuration and active deployment URL", () => {
    cy.intercept("GET", jcloudify(`/whoami`)).as("whoami");
    cy.intercept(
      "GET",
      jcloudify(`/users/${it_yumeT023.id}/applications?page=*&page_size=*`)
    ).as("getApplications");
    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/${TARGET_APP_ID}/environments`
      )
    ).as("getEnvironments");
    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/${TARGET_APP_ID}/environments/*/config`
      )
    ).as("getEnvironmentConf");

    cy.withToken(it_pat);

    cy.visit("/");

    cy.wait("@whoami");
    cy.wait("@getApplications");

    cy.get("[aria-label='Profile']").click();

    cy.contains(it_yumeT023.username!);
    cy.contains(it_yumeT023.email!);
    cy.get("body").click();

    cy.getByTestid(`show-${TARGET_APP_ID}-app`).click({force: true});
    cy.getByHref(`/applications/${TARGET_APP_ID}/show/environments`).click();

    cy.contains("Prod").click();
    cy.contains("prod");

    cy.getByTestid("api-url")
      .invoke("text")
      .then((apiUrl) => {
        expect(isValidURL(apiUrl)).to.be.true;

        cy.request("GET", `${apiUrl}/ping`).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  });
});
