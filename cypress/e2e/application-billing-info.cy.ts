import {app1, app3} from "../fixtures/application.mock";
import {app1_prod_billing_info} from "../fixtures/billing-info.mock";
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
    cy.contains("Amount to due");
    cy.contains("$ 8.88");
    cy.contains("Start date");
    cy.contains(`${app1_prod_billing_info.start_time?.toDateString()}`);
    cy.contains("End date");
    cy.contains(`${app1_prod_billing_info.end_time?.toDateString()}`);
  });

  specify("Show no env app billing info", () => {
    cy.getByTestid(`show-${app3.id}-app`).click({force: true});
    cy.wait("@getApplications");
    cy.wait("@getEnvironments");

    cy.get('[href="/applications/app3/show/billing"]').click();
    cy.wait("@getAppBillingInfo");
    cy.contains("Amount to due");
    cy.contains("$ 0.00");
    cy.contains("Start date");
    cy.contains(`${app1_prod_billing_info.start_time?.toDateString()}`);
    cy.contains("End date");
    cy.contains(`${app1_prod_billing_info.end_time?.toDateString()}`);
  });
});
