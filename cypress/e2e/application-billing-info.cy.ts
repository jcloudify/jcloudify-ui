import {app1, app3} from "../fixtures/application.mock";
import {
  preprod_billing_info,
  prod_billing_info,
} from "../fixtures/billing-info.mock";
import {user1} from "../fixtures/user.mock";

describe("Application Billing Info", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  specify("Show app1 billing info", () => {
    cy.getByTestid(`show-${app1.id}-app`).click({force: true});
    cy.wait("@getApplications");
    cy.wait("@getEnvironments");

    cy.get('[href="/applications/app1/show/billing"]').click();
    cy.wait("@getAppBillingInfo");
    cy.wait("@getEnvironments");
    cy.wait("@getEnvBillingInfo");
    cy.contains("Total Due");
    cy.contains("$ 8.88");
    cy.contains("Details");
    cy.contains("Prod");
    cy.contains(`$ ${prod_billing_info.computed_price?.toFixed(2)}`);
    cy.contains("Preprod");
    cy.contains(`$ ${preprod_billing_info.computed_price?.toFixed(2)}`);
  });

  specify("Show no env app billing info", () => {
    cy.getByTestid(`show-${app3.id}-app`).click({force: true});
    cy.wait("@getApplications");
    cy.wait("@getEnvironments");

    cy.get('[href="/applications/app3/show/billing"]').click();
    cy.wait("@getAppBillingInfo");
    cy.wait("@getEnvironments");
    cy.contains("Total Due");
    cy.contains("$ 0.00");
    cy.contains("Details");
    cy.contains("No results");
  });
});
