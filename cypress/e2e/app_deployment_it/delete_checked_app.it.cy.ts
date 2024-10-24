import {it_app, it_pat, it_yumeT023} from "../../fixtures/ops.data";
import {jcloudify} from "../../support/util";

describe("Delete checked app", () => {
  specify("delete target app", () => {
    cy.intercept("GET", jcloudify(`/whoami`)).as("whoami");
    cy.intercept(
      "GET",
      jcloudify(`/users/*/applications?page=*&page_size=*`)
    ).as("getApps");
    cy.intercept(
      "GET",
      jcloudify(`/users/${it_yumeT023.id}/applications/*/environments`)
    ).as("getEnvironments");
    cy.intercept("PUT", jcloudify(`/users/${it_yumeT023.id}/applications`)).as(
      "deleteApp"
    );

    cy.withToken(it_pat);

    cy.visit("/");

    cy.wait("@whoami");
    cy.wait("@getApps");

    cy.getByTestid(`delete-${it_app.name}-app`).click();
    cy.contains("Confirm").click();
    cy.wait("@deleteApp");
  });
});
