import {app1, app3} from "../fixtures/application.mock";
import {
  app1_preprod_billing_info,
  app1_prod_billing_info,
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
    cy.contains("Current month");
    cy.contains("$ 8.88");
    cy.contains("Start date");
    cy.contains(`${app1_prod_billing_info.start_time?.toLocaleDateString()}`);
    cy.contains("End date");
    cy.contains(`${app1_prod_billing_info.end_time?.toLocaleDateString()}`);
    cy.contains("Details");
    cy.contains("Prod");
    cy.contains(`$ ${app1_prod_billing_info.computed_price}`);
    cy.contains("Preprod");
    cy.contains(`$ ${app1_preprod_billing_info.computed_price}`);
  });

  specify("Show no env app billing info", () => {
    cy.getByTestid(`show-${app3.id}-app`).click({force: true});
    cy.wait("@getApplications");
    cy.wait("@getEnvironments");

    cy.get('[href="/applications/app3/show/billing"]').click();
    cy.wait("@getAppBillingInfo");
    cy.wait("@getEnvironments");
    cy.contains("Current month");
    cy.contains("$ 0.00");
    cy.contains("Start date");
    cy.contains(`${app1_prod_billing_info.start_time?.toLocaleDateString()}`);
    cy.contains("End date");
    cy.contains(`${app1_prod_billing_info.end_time?.toLocaleDateString()}`);
    cy.contains("Details");
    cy.contains("No results found");
  });
});
