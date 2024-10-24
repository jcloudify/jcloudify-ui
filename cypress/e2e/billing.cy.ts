import {billingInfo} from "../fixtures/billing-info.mock";
import {paymentDetails} from "../fixtures/billing.mock";
import {user1} from "../fixtures/user.mock";

describe("Billing", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/billing`).click();
  });

  specify("Billing details summary", () => {
    cy.wait("@getBillingInfo");
    cy.wait("@getPaymentDetails");

    cy.contains(
      "JCloudify is currently in beta testing and is free of charge, so make the most of it! Billing is provided for information only."
    );
    cy.contains("Payment Details Summary");
    cy.contains("Current month");
    cy.contains(`$ ${billingInfo.computed_price?.toFixed(2)}`);
    cy.contains("Start date");
    cy.contains(`${billingInfo.start_time?.toLocaleDateString()}`);
    cy.contains("End date");
    cy.contains(`${billingInfo.end_time?.toLocaleDateString()}`);
    cy.contains("Name");
    cy.contains(paymentDetails.name!);
    cy.contains("Email");
    cy.contains(paymentDetails.email!);
    cy.contains("Phone");
    cy.contains(paymentDetails.phone!);
  });
});
