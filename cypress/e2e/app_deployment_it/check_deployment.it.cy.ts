import {isValidURL} from "../../../src/utils/url";
import {
  it_environment_config,
  it_pat,
  it_yumeT023,
} from "../../fixtures/ops.data";
import {jcloudify} from "../../support/util";

describe("Check deployment", () => {
  const appId = "<target_app_id>";

  specify("check deployment configuration and active deployment URL", () => {
    cy.intercept("GET", jcloudify(`/whoami`)).as("whoami");
    cy.intercept("GET", jcloudify(`/users/*/applications/*/environments`)).as(
      "getEnvironments"
    );
    cy.intercept(
      "GET",
      jcloudify(`/users/*/applications/*/environments/*/config`)
    ).as("getEnvironmentConf");

    cy.withToken(it_pat);

    cy.visit("/");

    cy.wait("@whoami");
    cy.get("[aria-label='Profile']").click();

    cy.contains(it_yumeT023.username!);
    cy.contains(it_yumeT023.email!);
    cy.get("body").click();

    cy.getByTestid(`show-${appId}-app`).click({force: true});
    cy.getByHref(`/applications/${appId}/show/environments`).click();

    cy.contains("Prod").click();
    cy.contains("prod");

    cy.wait("@getEnvironmentConf");
    cy.contains("3.6.2");
    cy.contains(it_environment_config.general.package_full_name!);

    cy.getByTestid("api-url")
      .invoke("text")
      .then((text) => {
        expect(isValidURL(text)).to.be.true;
        cy.writeFile("deployment-url.txt", text);
      });
  });
});
