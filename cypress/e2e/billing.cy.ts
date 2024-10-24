import {billingInfo} from "../fixtures/billing-info.mock";
import {user1} from "../fixtures/user.mock";

describe("Billing", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/billing`).click();
  });

  specify("Billing details summary", () => {
    cy.wait("@getBillingInfo");

    cy.contains("Billing");
    cy.contains("Total Due");
    cy.contains(`$ ${billingInfo.computed_price?.toFixed(2)}`);
  });
});
