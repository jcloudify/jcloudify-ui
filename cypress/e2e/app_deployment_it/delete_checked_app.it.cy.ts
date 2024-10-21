import {isValidURL} from "../../../src/utils/url";
import {it_pat, it_yumeT023, TARGET_APP_ID} from "../../fixtures/ops.data";
import {jcloudify} from "../../support/util";

describe("Delete checked app", () => {
  specify("delete target app", () => {
    cy.intercept("GET", jcloudify(`/whoami`)).as("whoami");
    cy.intercept(
      "GET",
      jcloudify(`/users/*/applications?page=*&page_size=*`)
    ).as("getApplications");
    cy.intercept(
      "GET",
      jcloudify(
        `/users/${it_yumeT023.id}/applications/${TARGET_APP_ID}/environments`
      )
    ).as("getEnvironments");
    cy.intercept("PUT", jcloudify(`/users/${it_yumeT023.id}/applications`)).as(
      "deleteApplications"
    );

    cy.withToken(it_pat);

    cy.visit("/");

    cy.wait("@whoami");
    cy.wait("@getApplications");

    cy.getByTestid(`delete-${TARGET_APP_ID}-app`).click();
    cy.contains("Confirm").click();
    cy.wait("@deleteApplications");
  });
});
